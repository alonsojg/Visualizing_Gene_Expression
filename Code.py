from matplotlib import style
from sklearn import model_selection
from sklearn import neighbors
from sklearn import preprocessing
from sklearn.feature_selection import SelectPercentile, f_classif
from sklearn.model_selection import StratifiedShuffleSplit

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd 
import pprint as pp
import pickle as pkl

labels = 'Original_data/actual.csv'
test_path = 'Original_data/data_set_ALL_AML_independent.csv'
train_path = 'Original_data/data_set_ALL_AML_train.csv'

labels_df = pd.read_csv(labels, index_col = 'patient')
test_df = pd.read_csv(test_path)
train_df = pd.read_csv(train_path)

# Dropping 'call' rows

ds = [col for col in test_df.columns if 'call' in col]
test_df.drop(ds, axis = 1, inplace = True)

ds = [col for col in train_df.columns if 'call' in col]
train_df.drop(ds, axis = 1, inplace = True)

# Transpose all columns in test_df and train_df

test_df = test_df.T
train_df = train_df.T

# rename all columns

test_df.columns = test_df.iloc[1]
train_df.columns = train_df.iloc[1]

# make gene description and gene accession number dictionary

l1 = test_df.loc['Gene Description'].tolist() + \
		train_df.loc['Gene Description'].tolist()
l2 = test_df.loc['Gene Accession Number'].tolist() +\
		train_df.loc['Gene Accession Number'].tolist()
d = {}

for i in enumerate(l2):
	d[i[1]] =  l1[i[0]]

# dropping 'Gene Description' and 'Gene Accession Number' columns

test_df = test_df.drop(['Gene Description', 'Gene Accession Number']).apply(pd.to_numeric)
train_df = train_df.drop(['Gene Description', 'Gene Accession Number']).apply(pd.to_numeric)

# Replacing label feature's label for int values 

dic = {'ALL':0,'AML':1}
labels_df.replace(dic,inplace=True)

# Sorting index values

test_df.index = pd.to_numeric(test_df.index)
test_df.sort_index(inplace = True)

train_df.index = pd.to_numeric(train_df.index)
train_df.sort_index(inplace = True)

labels_df.index = pd.to_numeric(labels_df.index)
labels_df.sort_index(inplace = True)

# setting index values

test_df.index.name = 'patient'
train_df.index.name = 'patient'

# joining tables

labels_test = labels_df[labels_df.index > 38]
test_df = pd.concat([labels_test,test_df], axis = 1)

labels_train = labels_df[labels_df.index <= 38]
train_df = pd.concat([labels_train,train_df], axis = 1)

test_df.replace(np.inf, np.nan, inplace = True)
train_df.replace(np.inf, np.nan, inplace = True)

test_df.fillna(value = test_df.values.mean(), inplace = True)
train_df.fillna(value = train_df.values.mean(), inplace = True)

train_df = train_df.append(test_df)

d2 = {}

def features_pca(df):
	
	df1 = df.copy()
	labels = df1.cancer.values
	features = preprocessing.scale(df1.drop("cancer", axis = 1).values) 
	features_names = np.array(df1.drop("cancer", axis = 1).columns.tolist())

	sss = StratifiedShuffleSplit(n_splits = 9, test_size = 0.1)

	a = []
	dict_a = {}

	for train_index, test_index in sss.split(features, labels): 
		X_train, X_test = features[train_index], features[test_index]
		y_train, y_test = labels[train_index], labels[test_index]

		s = SelectPercentile(f_classif, percentile = 1)

		s.fit(X_train, y_train)
	
		important_features = s.get_support()

		scores = s.scores_
		scores = scores[important_features].tolist() 

		pca_features = features_names[important_features].tolist()

		scores_report =\
		{pca_features[i]:scores[i] for i in range(len(pca_features))}

		if len(dict_a) == 0:
			dict_a = scores_report

		else:
			i_sect = set(dict_a.keys()) & set(scores_report.keys())
			dict_a = {i:scores_report[i] for i in i_sect}

	a = sorted(dict_a, key=dict_a.get)

	for i in a:
		if i in d:
			d2[i] = d[i]

	a.append('cancer')

	return a

ifeatures = features_pca(train_df)
train_df = train_df.loc[:,ifeatures]
train_df.sort_values(by='cancer', ascending = False, inplace=True)
train_df [train_df.columns.tolist()] = preprocessing.scale(train_df.values)
train_df.to_csv('scaled.csv')

f = open('gene_description.txt','w')
print >> f,'These are listed from least statitically significant to most of the first percentile \n'
for i in ifeatures[:-1]:
	print >> f, str(i)+' : '+str(d2[i])+'\n'
f.close()

f = open('gene_description.js','w')
print >> f, 'var gnsAndDescripts = '+str(d2)
f.close()


# Uncomment lines below to llok at pyplot heatmap
# for demostration purposes

# def visualize_data(df, name):

# 	df1 = df
# 	column_labels = df.columns
# 	row_labels = df.index
# 	fig1 = plt.figure()
# 	ax1 = fig1.add_subplot(111)

# 	heatmap1 = ax1.pcolor(df1, cmap=plt.cm.bone)
# 	fig1.colorbar(heatmap1)

# 	ax1.set_xticks(np.arange(df1.shape[1]) + 0.5, minor=False)
# 	ax1.set_yticks(np.arange(df1.shape[0]) + 0.5, minor=False)
# 	ax1.invert_yaxis()
# 	ax1.xaxis.tick_top()
# 	ax1.set_xticklabels(column_labels)
# 	ax1.set_yticklabels(row_labels)
# 	plt.xticks(rotation=90)
# 	heatmap1.set_clim(-1,1)
# 	plt.tight_layout()
# 	plt.savefig(name+".png", dpi = (300))
# 	plt.show()

# visualize_data(train_df[train_df.index < 36], 'first')
# visualize_data(train_df[train_df.index >= 36], 'second')