**Goal :** The objective of this project is to provide a website/portal to help patients, counselors and doctors to have access faster to the medical system.

**Description:** A software system that helps patients to get a consultation from counselors or doctors based on the severity of their symptoms. The users of this software system are patients, counselors, doctors, and managers. This project is about collecting patients' data by filling out a self-assessment form. After that, the self-assessment results are sent to a counselor, who can either reject the request or assign it to a specific doctor. The counselor can also schedule an appointment with the patient directly to know more about the patient’s health issues. And the doctor can also schedule the appointment with the patient or can reject the appointment forwarded by the counselor.
Eventually, the patient will get a notification about the status of their appointment on the portal.

**Approach Used :** Agile Development

**Project objective:**

The objective of the project is to implement all the capabilities of corresponding users(doctor, patient, Manager, Counsellor ) in three sprints in the form of a website to help patients, counselors and doctors to have faster access to the medical system. The main goal of the project is that the patient must be able to fill the self-assessment form and according to the results the appointment must be fixed and notified to the patient with the appointment details.

**Assumptions:**
1.	The Features to be delivered upon in different sprints have been decided based on the user requirements.
2.	The priorities are given to the user stories which are significant and where the other stories are dependent on high priority stories.
3.	The size of the story points are being decided with the complexity level and time taken to implement.
4.	Every story has a deadline with the sprints and is assumed to complete by a given timeline.
5.	The technologies adapted by the project team are assumed to work as expected and as found in the previous experience.
 
**Constraints:**
●	Time and Budget of the project is fixed with the variable being the scope of the project.
●	New resources cannot be hired in case of deficiency of resources.
●	Release and timeline of the project is fixed and cannot be modified.
●	Tools being used by the team should be free because of no overhead budget of the team.

**Deliverables:**
**Sprint 1:**
●	The basic project set up should be done in order to start the implementation.
●	The patient must be able to register with the username and password into the website and can login into the website.
●	The Manager must be able to register with the username and password into the website and can login into the website.
●	The Counsellor must be able to register with the username and password into the website.

**Sprint 2:**
●	For the patient there must be a home page where one can access different functionalities.
●	Patients must be able to fill the self assessment form and be able to see the display results along with the appointment date and time scheduled if it is approved by the counselor and the doctor.
●	Counselors must be able to login into the website, able to see the patients self assessments results only after their tests are submitted.
●	The Doctor must be able to register with the username and password into the website and can login into the website.
●	The Manager must have a home page, admin portal where he can manage the patients, doctors, counselors by adding or deleting them

**Sprint 3:**
●	Patients can be able to check the details of their own appointment.
●	Counselors must have a home page , able to assign a doctor to the patient, able to book an appointment for the patient, able to see the details of the appointment details of the patient, and also can remove the patient.
●	Doctors must be able to see the list of patients and their appointment details, and also be able to remove the patients.
●	Manager should be able see the complete report of the statistics and be able to approve/reject the registration request of the doctors.

**Success Metrics:**
●	Patients are able to successfully register, login, complete a self assessment test and take appointments.
●	Counselors are able to register, login, check patient appointments details, request appointments and assign doctors to a patient.
●	Doctors are able to register, login, approve/reject patient appointment requests.
●	Manager is able to approve registration requests, add/delete different users and fetch patient reports.
●	Patients can now easily self diagnose from the comfort of their homes and request for appointments instead of going physically to the hospital.
●	Doctors can approve/reject patients' requests remotely.
●	Manager can easily fetch out digital reports and can work efficiently.
●	Manager and Counselor can work remotely.
●	The software system will make the lives of everyone in the hospital industry easy.


**Out Of Scope**:
Due to constraints on Time and Budget, the team has to compromise with the scope of the project.
Some of the scope has been identified and shifted to out of scope because of the constraints and are written below :-
●	Notifying patients about their appointments through email.
●	Filter option on the patients list in the counselor’s homepage.
●	Auto logout after user inactivity where the user must be logged out after the user stops using the page for a few minutes.
●	Verification of User(Patient, Counsellor, Doctor, Admin) via email , where the user needs to get a mail with verification link for the security for the information.
●	Forget Password to recover the password by the user.
●	Human Turing Test(ex. captcha) which is a test done on the user Interface in order to verify that the user is a human.
●	Internationalization requires a huge budget Initially and expansion into the international market is tough. It is kept out of scope.
●	Multiple languages are not supported.
●	UI screen reading to convert to text messages.
●	Canceling or rescheduling appointments by the patient is kept out of scope.
●	Automatic rejection of appointments for a patient who already has an upcoming appointment.
●	Session maintenance for User(Patient, Counsellor, Doctor, Admin).
●	Mobile and Desktop applications are kept out of scope because several configurations and extra implementation of several functionalities need to be done which is not possible in a short span.

 **Project approach and technologies**
**Methodologies:** Agile

The project has followed agile methodology by delivering a specific set of features in different iterations. The project has been completed in three sprints of two weeks each. Agile has been used as the methodology to deliver the project so that proper feedback from the customer can be taken after each iteration and the same has been incorporated in the project. The agile approach which has been followed in this project is scrum.

Scrum Agile approach has been followed in this project. User Backlog stories were written by the project owner and scrum master by collaborating with the needs of the customer and transforming those needs into user stories with the help of business analysts. These stories were then given priority and the same were picked in different sprints based on the priority. Daily meetings took place with the scrum master being the mediator of the meetings.
Components of the Shelf

We have used various off the shelf components to support our project. These components have been chosen carefully to avoid the requirements of customization of these components in the near future. This will avoid conflicts with the components in the future. These include -

**1.	Jira
2.	Confluence
3.	Slack
4.	GitHub
5.	Postgres
6.	Heroku**

**Custom Coding**

Although a lot of components are being used, the core business logic of the software project has been custom coded to meet the business requirements of the project stakeholders.
**Launch Strategy of the Project:**

The project has been developed in iterations and feedback of the project stakeholders has been taken after every iteration. But the launch of the project is not phased. It was released all in one at the end of the last iteration and quality assurance. Phased approach was not followed to release the project because the functionality of the project was interrelated and full usability of the project cannot be extracted out without all the features.
Technologies

**Project Management tools**

**Jira**
The management of the project was done with the help of Jira. This is an off the shelf component which provides various features such as task management, project and issue tracking, backlog prioritization.

**Confluence**
Confluence was used to capture project requirements, write project kickoff documentation and documentation of key decisions.
Communication

**Configuration management**
**GitHub:** Configuration management was an important part of the project. There was a requirement to keep track of various versions of the project software which would be done with the help of GitHub. GitHub provided various features such as change track management, remote collaboration.
**Backend**
**Java Spring Boot:**
The backend of the project software was implemented in java using the spring framework. This was used as the technology for backend implementation because the team had a proven experience in the same technology and team members had done the same types of project with the same technology. Also, there is a lot of community support for Java Spring Boot which makes it very efficient to be adopted. Java Spring Boot has proven to be the technology which has provided scalable, maintainable and highly available software solutions in the past.
**Frontend**
**Java Script, HTML, CSS and React** were used to build the front-end application. We stuck with these core technologies as it was a small project and these form the basis for any other technologies required for creating UI.
**Database**
**Postgres**: 
Postgres is an open source database software in which the team had an experience in the past. It supports all the features required to develop our project. It has already been in the industry for a lot of time making it a reliable choice for the project. It being open source also helped in the cost reduction of the software.
**Cloud**
**Heroku**:
We used Heroku free cloud services to deploy our software to help in remote development collaboration of the project.

Manual Testing:

Manual testing was done by manually checking the behavior of the system and detailed reports were submitted along with the sprint deliverables.
For details refer to the below given file. MANUAL TESTING
Critical Test cases and Issues faced while testing:


●	The functionality of the Registration number for Counselor and the doctor, i.e steps for writing test cases for the validation of registration number during logging into the system was complicated at starting, later on it was resolved that registration number can be checked by the manager and can delete the user(patient/counselor) if the registration number registered is not valid.
 
●	Making an appointment by the counselor test cases seemed to be difficult for writing stepwise test cases, because the functionality seems to work in many ways in the perspective of developers to implement i.e, does the counselor can make an appointment for another counselor along with making scheduling an appointment to himself?, Later on it was clarified that counselor can schedule an appointment to himself and assign any doctor to the patient.
●	Doctor/Counselor require approval for their registration feature functionality was not clear, so in team meetings we decided that doctor/counselor registration number must be validated by the manager via the admin portal.
●	Some features can be implemented with given functionality in many different ways, figuring out the expected functionality and writing test cases according to the functionalities were hard before the implementation, Although, by validating the functionality iteratively with the test cases made easy to find the actual result vs expected result and modified according to the functionality.
●	Fields to validate are tricky, for example
○	When the user registers into the system, what are the appropriate error messages the user can view if any particular field validation is not fulfilled, but we decided to implement an error message if the user enters an wrong format for gmail, and if the password set was not satisfying the length and pattern required.
○	Patient details that are to be displayed.


Risk management for the functionality developed

Sr.
No.	
Project Risk Item	
Risk Category	
Risk Management Technique
 

1	
Encountered some minor	technical difficulties		while developing the project.	
Technological Risks	
Mitigation:

●	Frequent communication (daily meetings) helped us to discuss and resolve the issues faced

2	
Dependency on other team members	
Dependency Risk	
Mitigation:


●	Constant communication with the other team members about their task status.
●	To avoid hassle, we have discussed and prioritized the tasks, then tried to close the tasks in the assigned time.

3	
Integration	between front-end and backend.	
Integration Risk	

Mitigation:

●	Always checked for code consistency (while pulling and pushing the code)

4	
Few tasks needed a little more effort than estimated	
Estimation Risk	
Mitigation:


●	Analyzed what went wrong.
●	Tried to complete the tasks with the help of other teammates, so that there is zero to minimum impact on the dependent tasks.
 

5	
Only a few of the team members	have experience on the front-end.	
Technology Risk	
Mitigation:


●	To get an idea of how to do, we went through the available online resources.
●	Communication among the team members about the issues faced also helped.

6	
Poor Code Quality	
Quality Risk	
Mitigation:

●	Developed the project using a set of pre-defined coding standards.
●	Incorporated frequent peer reviews on any further changes.



Cautions

●	We cannot assure a 100% user satisfaction because of lack of direct user engagement with the project team.
Disclaimers
●	We cannot guarantee that the operations in Arogya will work continuously without any interruption or completely error free.
●	The team of Arogya (stakeholders) are not liable for any of the damage
including incidental and consequential loss or profit to the distributors of Arogya, in any given case.
●	The team of Arogya is not responsible for any sort of damage to the users (Patients, Counselors, Doctors, Managers).


Measurement data and analysis on success indicators.

Success criteria 1:
Defect Density (DD) should be less than two defects in each sprint. Defect density for the three sprints is shown in the below graph.
 
Indicator 1:


Success criteria 2

The percentage of fixed issues per sprint should be more than 95%. For every sprint, the percentage of issues fixed is 100%

Indicator 2

Success criteria 3
The percentage of open issues for every sprint is zero.

Indicator 3
 
 

Success criteria 4
Functionalities that are planned for each sprint, must be completed on time.

Indicator 4

Stories that are planned for every sprint are moved to the DONE stage. The functionalities

are tested, and the test report is documented.

Success criteria 5
The percentage of acceptance test cases must be at least or more than 95%.

Indicator 5
 
 

Success criteria 6
The percentage of work planned for every sprint is shown in the below graph.

Indicator 6





Analysis of the Results from Sprint 1, Sprint 2 and Sprint 3:
The defect density for sprint 1 is two, however, it is zero for sprints 2 and 3; it is evident that the defect density decreases from sprint 1 to sprint 3. The percentage of defects addressed is consistent across sprints, showing that the work planned for those sprints was done on time. There are no outstanding issues. All scheduled tasks are
 
properly logged and marked as accomplished. The percentage of acceptance test cases remains constant across all sprints. Finally, sprint 1 finished with 24% of the target, sprint 2 with 25%, and sprint 3 with the rest of the 51% of the complete project plan. There have been no defects reported in any of the sprints other than sprint 1, and all the acceptance test cases have been achieved with a 100% success rate.

Iteration Burndown Chart
An Iteration Burn down Chart is used to represent the total amount of effort put by the development team in an iteration. This graph is updated everyday to check the progress of the team. Unlike release burn down, Iteration Burn down represents a single iteration or spring . In the graph drawn above, the X-axis represents the days during the sprint.

In all the 3 sprints, there were 11 working days and 4 non-working( weekends) days. And Y-axis represents the total hours of  productive effort put in the given sprint (Including sub-tasks).

In the below graph, we will be using the total number of productive hours to calculate the total effort put for the sprint . The blue bars represent the actual hour flow of the sprint and orange represents the estimated( planned) workflow.

Before the start of the sprint, we have estimated and allocated a total of 160 productive hours to sprint
1.	Out of which all were utilized properly by the development team.The graph uses the blue bars to show the total productive hours left that can be utilized in the sprint till date.

Before the start of the sprint, we have estimated and allocated a total of 160 productive hours to sprint
2.	Out of which all were utilized by the development team.In addition, The team was also able to complete an additional 8 story points than initially planned. This was done by utilizing 20 more productive hours than planned. Therefore making the total productive hours to be 180 hours for the sprint 2.

Before the start of the sprint, we have estimated and allocated a total of 160 productive hours to sprint
3.	Out of which all were utilized by the development team.In addition, The team was also able to complete an additional 8 story points than initially planned. This was done by utilizing no more
 
productive hours than planned. Therefore making the total productive hours to be 160 hours for the sprint 3. The graph uses the blue bars to show the total productive hours left that can be utilized in the sprint till date.


Release Burndown Chart
A Release burndown chart is used to represent the total amount of work done by the development team. It also shows the team’s velocity in each sprint.This graph is updated every iteration or spring. In the given graph, the x-axis represents the iterations, where iteration_0 is the sprint where 0 amount of work is done and sprint 1 and sprint 2 are the sprints completed in the past. Spring 3 is the completed sprint for which we are representing the graph.

There were a total of 68 story points assigned to our project Arogya out of which 22 were to be done in sprint 3. And 22 story points and 8 in addition were completed in sprint 3.
So the velocity for the development team is 30 for sprint 3.


The graph shows the total story points left per iteration in blue bars which are 68,52 ,30 and 0 in iteration_0, iteration_1, iteration_2 and iteration_3 respectively. Whereas, the straight orange lines
 
are the total number of story points assigned for the project and are constant throughout. As no story points are added or subtracted extra in the middle of the project.
Bar representation for Iteration_3 is blank as no more stories are yet to be completed.





Retrospective analysis

Sprint 1 retrospective analysis

What went well:
1.	Division of individual tasks among the team members went well as it was the first time working on a project.
2.	Initially basic setup was a bit complicated as it was tough to work with new technologies and frameworks, but we were able to complete it.
3.	We were able to resolve integration issues of backend and frontend.
4.	Writing Acceptance test cases went well as the functionality of the
 
implementations were clear which was done in team meetings.

What can be improved:
1.	It was hard to set up the meetings suitable to each and every team member’s availability because of varying availability.
2.	Pick new libraries which are not over engineered.
3.	API calls integration was complicated in order to fetch the data as it was the first time.
4.	Proper documentation and communication regarding API interfaces.
5.	Setup for testing by QA can be improved

Point to work on:
1.	Documentation of API interface.
2.	Use more modes of communication and meetings.
3.	Reduced setup for testing by deploying frontend also on cloud.

Sprint 2 retrospective analysis
What went well:

1.	Task estimation was correct and approximately the same time was taken to complete different tasks as estimated.
2.	Integration tasks were performed without many complications.
3.	Writing Acceptance test cases went well as the functionality of the implementations were clear which was done in team meetings.
4.	Quality Assurance testing was done easily as the system was provided on cloud to the tester.

What can be improved:

1.	Team meetings setup can still be improved. It was an issue in the first sprint, but some measures were taken to improve it, and still the team feels that there can be improvements.
2.	API contracts were shared by the backend beforehand, but there were still some complications which needed further discussions. So, there is still room for improvement in contract bindings between frontend and backend.

Points worked on based on sprint1:

1.	Reduced setup for testing by deploying frontend also on cloud.
2.	Deployed Frontend to cloud.
 
3.	Documentation of API interface.
4.	APIs are being documented with examples.

Point to work on:

1.	Documentation of API interface but with general response structure.
2.	API interface needed to be discussed and agreed on.
3.	Use more modes of communication and meetings.

Sprint 3 retrospective analysis

What went well:
1.	Task estimation was correct and with the effort of team members, it took same productive hours thann estimated to not only complete initial story points planned, but also additional ones from backlog.
2.	Integration tasks were tricky, but with proper communication and co-operation of the team members, it went well without many complications.
3.	Writing Acceptance test cases went well as the functionality of the implementations were clear as discussed in team meetings.
4.	Quality Assurance testing was done smoothly as the system was provided on cloud to the tester.
5.	Additional story points taken from the backlog also have been completed within the planned productive hours.
6.	API contracts were shared by the backend beforehand and complications raised in the last sprint were discussed and resolved.
7.	Improvement in contract bindings between frontend and backend which was lacking in some extent in last sprint was taken care off.

Points worked on based on sprint 2:
1.	Documentation of API interface with general response structure.
2.	API interface has been discussed and agreed on.
3.	Used more modes of communication between team members.

**Customer satisfaction survey**
 
Sprint 1

Things learnt
●	Worked and ensured that there were no delays while calling the API
●	Learned that the validation for user inputs should be clearer and more worked on it in the next sprints.

Sprint 2

Things learnt
●	Worked on maintaining the consistency and reliability

Sprint 3

Things learnt

●	Worked on increasing the performance and efficiency

Undoubtedly, we can say that the customer satisfaction rate from Sprint 1 to Sprint 3 has increased.
