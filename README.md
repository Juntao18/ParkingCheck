Parking Slot Project
A Web-Based Parking Heatmap System for Maynooth University

NAME: Juntao Zhai

Final Year Project – 2025
B.Sc. Single Honours in
Computer Science and Software Engineering

Department of Computer Science
Maynooth University


1.  Project Overview
The Parking Slot Project is a web-based parking heatmap system designed to help users visualize real-time parking availability at Maynooth University. The system leverages user-reported updates and automated scheduled adjustments to provide accurate, up-to-date parking data. 

Unlike traditional sensor-based parking systems, this project adopts a software-only approach, reducing costs while maintaining accuracy. It integrates Firebase Firestore, Cloud Functions, and heatmap.js to deliver a scalable, real-time visualization of parking congestion.

2.  Deployment
The project is fully deployed on Firebase and can be accessed via the following domains:
    parkingcheck.co.uk (https://parkingcheck.co.uk )  
 	parkingcheck.web.app (https://parkingcheck.web.app )  
If you experience any issues, please contact:
Email me by Maynooth University or Email to jonzhai.ie@gmail.com  
3.  Features
Real-Time Parking Heatmap: Users can view the latest parking availability using a color-coded heatmap.  
User-Submitted Updates: Users can report available or occupied spaces directly via the web interface.  
Automated Data Updates: A Firebase Cloud Function runs every 30 minutes to adjust availability if no user updates are received.  
Authentication & Security: Only authenticated users can submit updates, ensuring data reliability.  
Scalable & Cost-Effective: No physical sensors required, making it a low-cost, cloud-based alternative.  

4.  System Architecture
The project follows a three-tier architecture:
4.1 Frontend (User Interface)  
   - Built using HTML, CSS, JavaScript with heatmap.js for dynamic visualization.  
   - Displays a static campus map with real-time parking indicators.  
   - Uses Firebase Firestore’s `onSnapshot()` listener for automatic updates.

4.2 Backend (Data Processing & Authentication)  
   - Uses Firebase Authentication for secure user login and access control.  
   - Firestore Security Rules ensure that only verified users can submit updates.  
   - Cloud Functions handle automated parking availability adjustments.

4.3 Database (Firestore NoSQL)  
   - Stores parking lot data (availability, timestamps, user reports).  
   - Organizes parking information using collections and documents.  


5.Technologies Used

Component             Technology 
Frontend        	 HTML, CSS, JavaScript, heatmap.js 
Backend       		 Firebase Firestore, Cloud Functions, Node.js 
Authentication  	 Firebase Authentication 
Database       		 Firestore (NoSQL) 
Security         	 Firestore Security Rules 


6. Setup Instructions
Only for developers, ordinary users please use the domain name website link provided in Section 2 directly.
6.1 Prerequisites
Ensure you have the following installed:
- Node.js (for Firebase Cloud Functions)
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project (set up Firestore, Authentication, and Cloud Functions)

6.2 Installation & Configuration
Clone the Repository
    git clone https://github.com/Juntao18/ParkingCheck.git
    cd ParkingCheck
