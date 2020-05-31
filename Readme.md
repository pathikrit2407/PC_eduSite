***Collaborative project by PC@WebTeam2020

=====SDLC: Phase 1========

*File Structure
+ Pragati Classes Online Platform
	+ model
		+students.js
		+teacher.js
		+admin.js
		+batches.js
		+videos.js (Only string file to be stored)
		+resources.js (only file names to be stored)
	+ router
		+index.js
		+auth.js
		+student.js
		+teacher.js
		+admin.js
		+might get added as per modularity
	+ view
		+index.ejs --> Home/Landing Page
		+studentLogin.ejs
		+teacherLogin.ejs
		+studentPortal.ejs
		+teacherPortal.ejs
		+might get added as per required
	+public
		+css
		+js
		+images
	+ app.js
	+ package.json
	+ Readme.md
	+ .gitignore 


=== WorkFlow --> 

1. Create app.js
2. Create Models as discussed in the meeting.
3. Create auth.js
4. Create index.js and first route for home page.
5. Create routes for other pages from index.js and set auth.js as middleware for them accordingly.
6. Create Admin.js for creating students and teacher.
7. Create Student.js, teacher.js
=======
1. Create a stunning home page (index.ejs)
2. Create a login for admin.
3. Create admin portal, which consists form for creating students and teachers.
4. Create Student and teacher login page.
5. Create Student portal.
6. Create Teacher portal.


=======
Responsibility of both frontend and backend team to check data flow is working fine.


Functionality:
1.Admin:
	Login
	Create student, teacher
	Upload resources
2.Student:
	Login
	End point for test
	Update his profile
	View resources (provided by teachers, admin)
	Watch videos (uploaded by teachers)
3.Teacher:
	Login
	Upload videos (only links)
	Upload resources


	


