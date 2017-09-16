import csv
import numpy as np
import pprint as pp 

l = []

with open('scaled.csv','rb') as f:
	a = csv.reader(f)
	for row in a:
		l.append(row)

cols = l[0][1:]
cols[-1] = 'Leukemia Subtype'
print cols
rows = range(1,73)

l = l[1:]
l = np.delete(np.array(l, dtype = float), 0, axis = 1)

maxData = np.amax(l)
minData = np.amin(l)

for i in l:
	if i[-1] == 1.37113092008:
		i[-1] = maxData
	elif i[-1] == -0.729324957489:
		i[-1] = minData

l3 = []
for i in enumerate(l):
	l2 =[]
	for ii in enumerate(i[1]):
		l2.append([ii[1], i[0],ii[0]])
	l3.append(l2)

f = open('data.js','w')
print >> f, 'var maxData = '+str(maxData)+';'
print >> f, 'var minData = '+str(minData)+';'
print >> f, 'var cols = '+str(cols)+';'
print >> f, 'var rows = '+str(rows)+';'
print >> f, 'var legendCols = '+str([i for i in np.linspace(minData,maxData, num = 10)])+';'
print >> f, 'var data = '+str(l3)+';'
f.close()