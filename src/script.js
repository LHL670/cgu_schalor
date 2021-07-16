function returnSchalor(doc){
	
	//console.log(doc.data());
	this.num_H_index = $("#num-H-index");
	this.num_H_index.html(doc.data().h_index);
	this.scholar_name=$("#scholar_name");
	this.scholar_name.html(doc.data().name);
	this.email=$("#email");
	this.email.html(doc.data().email);
	this.citations=$("#citations");
	this.citations.html(doc.data().citations);
	document.getElementById('picture-img').src=doc.data().picture;

	let school_icon=doc.data().school_icon;
	//console.log(school_icon);
	document.getElementById('chart').style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.74)),url('+school_icon+')';
	
	const citationsColor = document.getElementById("picture");
	const citation_num=doc.data().citations;
	console.log(citation_num);
	
	if(citation_num<=10){
		citationsColor.style.setProperty("--check-secondary", "#FF0000");
	}
	else if(11<=citation_num&&citation_num<=99){
		citationsColor.style.setProperty("--check-secondary", "#FF5809");
	}
	else if(100<=citation_num&&citation_num<=999){
		citationsColor.style.setProperty("--check-secondary", "#FFDC35");
	}
	else if(1000<=citation_num&&citation_num<=9999){
		citationsColor.style.setProperty("--check-secondary", "#00A600");
	}
	else if(10000<=citation_num&&citation_num<=99999){
		citationsColor.style.setProperty("--check-secondary", "#2894FF");
	}
	else if(100000<=citation_num&&citation_num<=999999){
		citationsColor.style.setProperty("--check-secondary", "#000093");
	}
	else {
		citationsColor.style.setProperty("--check-secondary", "#921AFF");
	}
	//citationsColor.style.setProperty("--check-secondary", "#fff");
	//console.log(window.getComputedStyle(picture,'::after'));
	//pictureColor=window.getComputedStyle(picture,'::after').background='red';
	//pictureC=document.getElementById('picture')
	//console.log(pictureC);
	//var c = pictureC.sheet;
	//pictureC.insertRule("#pictur#picture::after{background-color:black;}", 0);
	//c.insertRule("#d#d::before{color:blue;}", 0);
	//p.style.background='red';
	//document.getElementById('picture').style.after.backgroundColor='red';
}

var firebaseConfig = {
apiKey: "AIzaSyBGLQmN66v9ucTjXgctvmzqHC8H85ez_KE",
authDomain: "cgusholar.firebaseapp.com",
projectId: "cgusholar",
storageBucket: "cgusholar.appspot.com",
messagingSenderId: "436011084647",
appId: "1:436011084647:web:250d127f195857a4af1dc2",
measurementId: "G-H1WFVTFTC0"
};

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
//console.log(db);

		  
db.collection('cguscholar').where('name','==','Jeffrey M. Wooldridge').get().then(snapshot => {
snapshot.docs.forEach(doc => {
	//console.log(doc.data());
	returnSchalor(doc);
});
});
