
https://alonsojg.github.io/Visualizing_Gene_Expression/

Intro:

	This is a work in progress. Here I use a dataset created out of a proof of concept study published in 1999 by Golub et al. The idea behind this work was to demonstrate the possibilities of new cancer diagnostic techniques by gene expression monitoring, via DNA microarray, and therefore posed an interesting challenge in both the fields new cancer subtype discoveries and/or cancer subtype classification. This was used to classify patients into two subcategories of leukemia: Acute myeloid leukemia (AML) and acute lymphoblastic leukemia (ALL). Although this dataset was originally intended for the development of machine learning classifiers, I will be using them here first for data vizualization, and will later on engage in the development and illustraion of a classifier at work.

Design:

	The idea is to best illustrate how gene expression vary accross patients. The idea of a heatmap is very resemblent of a physical DNA microarray test. In a microarray surface there are openings, neatly arranged like a cartesian graph. After a microarray surface undergoes the initial steps in DNA microarray, a photosensor and laser is used in order to capture the luminescense of certain luminescent RNA particles attached to it. Some crevices will glow strongly, some will not, and others wil have a mild glow. Some times even different colors of lminescence are employed. The end result if a cartesian graph with crevices varying in glow.

	The gene codenames are meant to be clicked to display a name and/or a definition of each gene's role in each Leukemia subtype.

Summary:

	The graph is representative of how, depending on the subtype of Leukemia, each selected gene's expression (use) varies. While some genes are expressed often in cells pertaining to one class of Leukemia, they are not as expressed in cells that constitute the other Leukemia class.

Content:

	Original Data:

		'data_set_ALL_AML_indepent.csv'
		'data_set_ALL_AML_train.csv'
		'actual.csv'

			Original data extracted from  Golub et al's "Molecular Classification of Cancer: Class Discovery and Class Prediction by Gene Expression Monitoring". These are present the Original_data folder.This dataset was previously separated into two CSV files: 'data_set_ALL_AML_indepent.csv' and 'data_set_ALL_AML_train.csv', so each column in each of these two files is a separate patient, and their respective labeling feature is in 'actual.csv', where the patients column holds each patient's number. Please ignore all 'call' columns in 'data_set_ALL_AML_indepent.csv' and 'data_set_ALL_AML_train.csv', they posses no information, instead the seem to be product of a bug in the creation of the dataset.

	'scaled.csv'

		This is the result of my data cleaning. Here I transposed the dataset, and got rid of unnecessary columns like all 'call' columns. Here, I also normalized and joined all datasets accordingly.

	'Code.py'

		This is were all cleaning required was performed, along with merging of all dataset and extraction of important features' names and their respective descriptions.

	'gene_description.txt'

		Here is where each gene displayed's description is stored along with it's accession number in pairs for better understanding.

	'data_conversion.py'

		Here all CSV is converted into it's appropriate javascript format for browser processing and display.

	'data.js'

		Here is where 'data_conversion.py' output is stored.

	'app.js'

		Here all js scripting is stored.

	'plot.html'

		Here all html and css formatting is stored.

Resources/Acknowledgements:

	Molecular Classification of Cancer: Class Discovery and Class Prediction by Gene Expression Science 286:531-537. (1999). Published: 1999.10.14 T.R. Golub, D.K. Slonim, P. Tamayo, C. Huard, M. Gaasenbeek, J.P. Mesirov, H. Coller, M. Loh, J.R. Downing, M.A. Caligiuri, C.D. Bloomfield, and E.S. Lander

	These datasets have been converted to a comma separated value files (CSV).
