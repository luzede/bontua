const map = new Map();

map.set('1', {
	questionId: 1,
	question: 'Σε ένα ισοζυγισμένο δυαδικό δέντρο αναζήτησης με **n** στοιχεία, η αναζήτηση ενός στοιχείου:',
	answers: ['απαιτεί χρόνο **O(1)** στη χειρότερη περίπτωση.',
		'απαιτεί χρόνο **Ω(n)** στη χειρότερη περίπτωση.',
		'απαιτεί χρόνο **Ο(1)** στην καλύτερη περίπτωση.',
		'απαιτεί χρόνο **Ω(n logn) στη χειρότερη περίπτωση.'],
	correctAnswerIndex: 2,
	code: undefined,
	// This has to be array with codes included that go alongside the question
	year: '2018',
});
map.set('2', {
	questionId: 2,
	question: 'Έστω ότι έχετε τρεις διαφορετικούς αλγορίθμους Α, Β και Γ, που επιλύουν το ίδιο πρόβλημα. Η πολυπλοκότητα του Α είναι Ο(n^3), του Β είναι Ο(n^2 log^5(n)), και του Γ είναι Ο(n!). Ποιον από τους τρεις θα προτιμούσατε; (Θεωρήστε ότι μας ενδιαφέρουν μεγάλες τιμές του n.)',
	answers: ['τον Α',
		'τον Β',
		'τον Γ',
		'οποιονδήποτε από τους Α ή Β, δεν έχουν διαφορά'],
	correctAnswerIndex: 1,
	code: undefined,
	year: '2018',
});
map.set('3', {
	questionId: 3,
	question: 'Ποια είναι η τιμή της μεταβλητής **t** στο τέλος της εκτέλεσης του ακόλουθου τμήματος προγράμματος;',
	answers: ['1023',
		'1024',
		'2047',
		'κανένα από τα προηγούμενα'],
	correctAnswerIndex: 0,
	code: ['```js\nint n = 1024, t = 0;\nfor (int i = 1; i <= n; i *= 2) {\n\t for (int j = 1; j <= i; j++) t++;\nn--;\n}\n```'],
	year: '2018',
});
map.set('4', {
	questionId: 4,
	question: 'Ποια από τα παρακάτω προγράμματα τυπώνει **42**;',
	answers: ['το πρώτο',
		'το δεύτερο',
		'και τα δύο',
		'κανένα από τα δύο'],
	correctAnswerIndex: 0,
	code: ['```js\nint k=3;\n PROC proc1(int &n) {\n\tk *= n-1; WRITELN((n+1)*k);\n}\nPROGRAM { proc2(k); }\n```', '```js\nint k=3;\n PROC proc2(int n) {\n\tk *= n-1; WRITELN((n+1)*k);\n}\nPROGRAM { proc1(k); }\n```'],
	year: '2018',
});
map.set('5', {
	questionId: 5,
	question: 'Τι τυπώνει το παρακάτω πρόγραμμα;',
	answers: ['6',
		'8',
		'42',
		'κανένα από τα προηγούμενα'],
	correctAnswerIndex: 3,
	code: ['```js\nPROGRAM {\n\tint *p = new int; *q = new int; *t = new int;\n\t*p=3; *q=5; *t=7;\n\tp=q; q=t;\n\t*t=*p * *q; *q *= *p;\n\tWRITELN(*t);\n}\n```'],
	year: '2018',
});
map.set('6', {
	questionId: 6,
	question: 'Ποια είναι η τιμή της μεταβλητής **n** στο τέλος της εκτέλεσης του ακόλουθου τμήματος προγράμματος;',
	answers: ['131',
		'259',
		'1024',
		'κανένα από τα προηγούμενα'],
	correctAnswerIndex: 1,
	code: ['```js\nint n = 999, p = 1;\ndo { n /= 2; p *= 2; } while (n > 4);\nn += p;\n```'],
	year: '2018',
});