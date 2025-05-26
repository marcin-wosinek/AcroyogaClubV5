# **Acroyoga Club v5**

Application for Acroyoga Club — an informal association, that organizes
trainings and workshops in Valencia, Spain. The application offers the
following features:

* Shows upcoming and past activities,  
* Allows user to log in, to register for activities,  
* Send emails to users based on various filter options,  
* Schedule and manage activities,  
* Track registration for activities,  
* Collect the payments: member fees and activities.

For first implementation, make sure 

# **Design**

Keep the design minimalistic — only two colours: almost white and almost black.
The current website is https://acroyoga-club.es/, keep the aesthetics, but
change the language to English.

Provide light and dark mode.

## **Home page**

The home page should feature a big calendar with activities displayed. We can
assume there will be only one activity per day in most cases.

# **Constraints**

Keep in mind that it's meant to be integrated with:

* Postgres for data storage,  
* Replit or email and password for auth,  
* Resend for mailing,  
* Stripe for payments.

# **Stored data**

Data that the application will store.

## **Users**

People who are registered on the app. Members and non-members of the club,
people interested in club mailing. Stores:

* full name,  
* email,  
* membership status boolean (by default false),  
* admin status boolean (by default false),  
* roles (flyer, base),  
* Status (active, inactive),  
* acroyoga experiences (less than a year, 1-3 years, above 3 years),  
* Password (hashed with Bcrypt),  
* mailing boolean,

## **Activities**

Activities organized by the club. Stores:

* Title,  
* Location name,  
* Location address,  
* Description (simple HTML),  
* Image,  
* Date time,  
* Number of participants,  
* Capacity,  
* Price for non-members.

## **Sign-ups**

Links users and activities. Stores:

* Creation date,  
* Reference to user,  
* Reference to activity,  
* Reference to transaction for non-members

## **Transaction**

Summary of each payment made to the club. It's describing either activities
fees for non-members, or membership fees of members,

Stores:

* Creation date,  
* Reference to the user,  
* Reference to the sing-up, for non-members payments for activities,  
* Reference to the membership fee for members payments of fees,  
* Link to payment object in 3rd party provider.

## **Trimesters**

Membership payment campaigns, created as we approach the new trimester. Stores:

* Creation date,  
* Name,  
* Amount of membership fee (default to 45E),  
* Array of references to membership-fees.

## **Membership fees**

Represents all the expected membership payments for club members in a given
trimester. Stores:

* Creation date,  
* Fee,  
* Status (paid, pending, cancelled),  
* Reference to the user,  
* Reference to the trimester.

## **Emails**

Collection of emails drafts, and sent emails. Stores:

* Status \[draft, sent\],  
* Title,  
* Body,  
* Filter \['members', 'non-members', 'pending membership fees'\],  
* To users — list of users that got the email sent,  
* Date of sending,  
* Sending results

# **Routes**

Routes in the app, split according to the access levels.

## **Anonymous user**

Pages available for logged and not-logged-in users.

### **/home**

Shows calendar with activities. Allows user to read more about activities they
are interested in. Show register/login form for anonymous users. Shows
membership fee reminder for users with pending membership payment.

### **/login**

Login form. On successful login, it should redirect to the page that sent the
user there, or the home page. It should link the registration route.

### **/register**

Form for registration — allows user to set all fields besides membership
status, and admin.

### **/activities**

List of future all activities proposed by the club.

### **/activities/past**

List of all past activities by club.

### **/activity/:**

Shows info about the activity, and a sign-up button. For anonymous users,
sign-up button redirects them to login. Club memers can sign up for any
activity they want. The non-member can sign up only:

* On the day of the activity,  
* If there is spare capacity.

### **/terms-and-conditions**

Simple explanation of terms and conditions:

* We don't return payment if the user doesn't come, or cancel,  
* If we cancel activity, we return money, minus the transaction fee of the
  payment provider.

### **/privacy-policy**

Simple explanation of how we managed the data of the users.

## **Non-members users**

### **/activity/:**

Shows info about the activity, number of sign-up users, and capacity and a
sign-up button.The non-member can sign up only:

* On the day of the activity,  
* If there is spare capacity.

When they sign up, they will be charged activity price. On successful payment,
a new object is created in sign-up collection, linking the activity and the
member-user, and the payment translation.

## **Members**

### **/activity/:**

Shows info about the activity, a list of the sign-up users, and a capacity, and
a sign-up button. Club members can sign up for any future activity they want.
When they sign up, a new object is created in sign-up collection, linking the
activity and the member-user.

### **/user/:**

Page for each user. It should show all relevant transactions: membership fees,
or activity payments. Visible for members & admins; not visible for non-members
and not logged-in users.

If a member user is viewing their own user page, they should see information
about pending membership fees.

### **/transactions**

Page that shows all the transactions made for the club. Visible for members &
admins; not visible for non-members and not logged-in users

## **Admins**

Admin panel — semi-separate application, that allows admin to manage the data
for the club.

### **/admin/users**

Page that list all the users. Should highlight users with pending membership
fees, and link to view and edit page of each users.

### **/admin/user/:**

User page, optimized for admin tasks. Links to edit page.

### **/admin/user/:/edit**

Page that allows admin editing the users.

### **/admin/user/:/add**

Page to add new user. Should allow specifying any fields.

### **/admin/activities**

Page to list all activities for admin.

### **/admin/activity/:**

Page that shows activity, optimized for admin tasks.

### **/admin/activity/:/add**

Page to create new activities.

### **/admin/activity/:/edit**

Page for managing the activities

### **/admin/sign-ups**

Page with a list of all sign-up options — links to related transaction for
non-member users.

### **/admin/trimesters**

List or all trimesters, button to create a new one.

### **/admin/trimester/new**

Page to add a new trimester. It should add all users who are currently the
members of the club, default the membership fee to 45E, and create a draft of
membership fee mailing.

### **/admin/trimester/:**

To show info about chosen trimester. Especially which user paid and haven't pay
their fee yet.

### **/admin/mailings**

A list of all drafts and sent mails.

### **/admin/mailing/:/edit**

A page to edit draft mailings, or send them. When the send button is clicked,
It should propagate the to user field, with users matching the filter, and send
the mailing to mailing provider.

### **/admin/mailing/new**

A page to create a new mailing. New mailing should be a draft, has title, body
(simple WYSIWYG editor with HTML) and roles (members, non-members),

### **/admin/mailing/:/view**

Page to read sent mailings

# **User stories**

## **Anonymous user**

* I can view the activity calendar on the home page,  
* I can browse upcoming and past activities,  
* I can view detailed information about individual activities,  
* I can register for a new account with my personal details,  
* I can log in with my email and password,  
* I can read terms and conditions and privacy policy,  
* When I try to sign up for an activity, I am redirected to login.

## **Non-member**

* I can log in and access my account,  
* I can update my profile (except membership status and admin privileges),  
* I can view activity details including participant count and capacity,  
* I can sign up for activities only on the day of the activity if there is
  spare capacity,  
* I am charged the activity fee when I sign up for an activity,  
* I receive confirmation after successful payment and registration,  
* I can view my own transaction history.

## **Member**

* I can log in and access my account,  
* I can update my profile (except membership status and admin privileges),  
* I can sign up for any future activity regardless of capacity,  
* I can view the complete list of participants for activities,  
* I can see all club transactions,  
* I can view user profiles of other members,  
* I can see my pending membership fees on my profile page,  
* I can access my registration history and upcoming activities.

## **Admin**

* I can access all member features,  
* I can manage all user accounts including membership and admin status,  
* I can create, edit, and delete activities,  
* I can view all sign-ups and associated transactions,  
* I can create and manage membership fee collection periods (trimesters),  
* I can add all current members to a new trimester with default 45E fee,  
* I can track which users have paid or haven't paid their membership fees,  
* I can create email campaigns with HTML content using a WYSIWYG editor,  
* I can target emails to specific groups (members, non-members, pending fees),  
* I can save email drafts and send them when ready,  
* I can view sent email history and delivery results,  
* I can add new users with full field access,  
* I can access comprehensive reporting on club activities and finances.
