# A Bugs Life

A Bugs Life is a web-based bug reporting and ticket management solution developed primarily for the Santa Clara University IT Department.

### You Can:
  - Create User Accounts
  - View Tickets reported per user
  - Edit the details of a specified ticket
  - Change the status of a ticket
  - View all the available tickets
  - View tickets in certain status categories
  - Get a general overview of all tickets

### Installation

**A Bugs Life Requires a Javascript enabled browser and Python 2.7 to run**

1). Downloaded the main `.zip` file from [here](https://github.com/Pearce-Ropion/a-bugs-life) or from the Camino upload.
2). Follow the following commands:
```sh
$ unzip aBugsLife-1.0.0.zip
$ cd backend
$ python main.py 
```

3). Once the server is running, it will print the following to console.
```
Application is running at this address:
(use.this.ip.address):8080/index.html
```
4). Open a web browser (chrome, firefox) and go to the address listed in the console above including the port number and file name.
> NOTE: The address listed in this readme will not work. You must use the address that was printed to the console upon running the app.

### Usage Guide
For the next section, you can use the login information from **Table 1** to login into each type of user available. For the purposes of demonstration, an additional dropdown menu has been added at the bottom right of the screen to allow for convenient switching between user types.
> Note: This additional dropdown would not be included in the app in a production setting as it would make the application insecure by voiding the need for a login system.

**Table 1**: Default User Login Information
| User Type | Email | Password |
| ------ | ------ | ------ |
| Manager | m@m.com | manager1 |
| Tester | t@t.com | tester1 |
| Developer | d@d.com | dev1 |
| User | u@u.com | user1 |
> Note: These email/password combinations have been made specifically for the final demonstration and would not be included in the app in a production setting.

#### Getting Started
1. On the top right of the page, click `Log In`
2. Click the `Create New User` button
3. Fill in your first name, last name, email and password in their respective fields
    * The email must conform to the standard. `<string>@<string>.<string>`
    * The password must be at east 6 characters long
4. Confirm your password
5. Click the `Create` button

#### Logging In
1. On the top right of the page, click `Log In`
2. Enter your email and password
    * You may use either the login credentials you just created in the **Getting Started** section, or the login credentials provided in **Table 1**.
3. Click `Log In`
> The default window shown for non-employees is all of the bugs reported by the currently logged-in user

#### The Lifecycle of a Bug Report
In this section we will follow a bug report through its expected lifecycle. In this use case we will be assuming that the reported bug is a valid bug.
> This guide is made under the assumption that you are using the additional dropdown menu located on the bottom right of the screen to switch between user types.

> If you are **not** using the additional user-type switcher, you will have to log out of each user type and log into the next user type as the guide proceeds. This is very time consuming an can get annoying.

Start by logging into a `User` account. You can do so using the login button or by using the user-type switcher in the bottom right.
1. Click `Create` on the top right
2. Fill in a `summary`, `description` of the problem and select a `component` from the dropdown menu
3. Click `Create`
    * You should see a success message popup on the screen for a couple seconds
4. The new bug report will show up on your list of reported bugs to the left
5. In the center of the screen you will be able to see details about the bug report including the its current status
6. Switch to the `Manager` account
    * You are welcome to do this in whatever way you see fit
7. You should see the bug report you just created at the top of the list on the left
8. Assign the bug report to a tester by clicking the `Re-Assign` button on thr right side of the screen
    * An additional step would be to first click the `Assign to Me` button to assign the bug report to the `Manager`
9. In the search box, type `Osama` and select `Osama Shoubber` from the search result list
10. Click `Update`
11. Switch to the `Tester` account
12. You should see the bug report that was just assigned to you at the top of the list on the left.
13. Click the `Assigned` button on the top left to see only the bug reports that are assigned to you
14. On the right side, click `In Testing` to indicate that you are now testing to see whether the reported bug is actually a valid bug in the system
15. Assuming that the reported bug is a valid bug, click `Valid Bug` on the right
16. Click `Re-Assign` on the right and assign the bug to `Pearce Ropion`
17. Switch to the `Manager` account
18. Click `Re-Assign` on the right and assign the bug to `Vineet Joshi`
19. Switch to the `Developer` account
20. On the right side, click `In Progress` to indicate that you are now working on finding a solution to the bug described in the bug report
21. Assuming you have found a solution, click `Change Status` on the right
22. From the dropdown menu, select `Code Complete` to indicate that you have finished the code required to fix the bug
23. Click `Code Review` on the right to indicate that the code is now being reviewed by another developer
24. Click `Bug Fixed` on the right to change the bug report status to `Test Ready` to indicate that the code has been reviewed and approved and is now ready for testing
25. Click `Re-Assign` on the right and assign the bug to `Pearce Ropion`
26. Switch to the `manager` tab
27. Click `Re-Assign` on the right and assign the bug to `Osama Shoubber`
28. Switch to the `tester` tab
29. Click `Testing Bugfix` on the right to change the status to `QA Testing` to indicate that the proposed solution is getting tested to see if it fixes the bug and meets all qualitiy assuance standards.
30. Assuming the bugfix works. Click the `Close Ticket` button on the right.
31. From the dropdown menu, select `Done`
32. The bug report should now show a closed time on the bottom right of the details page

Make sure to check the **Bug Report Overview** Section to see how to generate reports for managers

#### Bug Report Overview (manager only)
The bug report overview page, which is only visible to managers, shows the status of all bugs that have been reported in the system. This is illustrated in pie chart which displays the number of bugs within each category and per category tables that show the different bug reports within each these categories along with their statuses:
  - Bug reports that are **Open** or have statuses that are similar to being Open
  - Bug reports that are related to the bug being **Tested**
  - Bug reports that are related to the bug fix being in **Development**
  - Bug reports that have been **Closed**

The following steps can be followed to access the bug report overview:
1. Click the `Log In` button in the top right
    * You can skip **step 1 - 2** by using the additional dropdown menu to switch to the `Manager` account
2. Login to manager using the email `m@m.com` and password `manager1`
3. Click the `Dashboard` button in the top left

### Other Use Cases
The following sections describe specific use cases of the application and are not required in the lifecycle of the bug report. By now, this guide will assume you are familiar with changing user accounts and will not go into detail on how to do so.
#### Reporting a Bug
##### Reporting a bug can be done while not logged in. 
When **not** logged in, the user is presented with the bug report creation form. The user will be required to fill in a brief decription of the bug called the `summary`, a detailed `description` and a relevant `component` within the SCU IT department. Users will also be asked to fill in their `first` and `last` name. This allows for efficient previewing of reported bugs per user and enables users who wish to create a user account at a later date to see their previously reported bugs.
1. Fill in the required fields
    * Attempting to create a bug report without filling in all the fields will result in an error being shown to the user and the bug report not being created until the user has fixed the erroring fields
2. Click `Create`
3. A message should pop up indicated that the bug report was created successfully

##### Reporting a bug can be done while logged in. 
When Logged in, the user can create a bug report using the `Create` button in the top right of the window. This gives regular users the same options without the name fields becasue the system already knows the name of the logged-in user. Additionally, when an employee (manager, tester, developer) creates a bug report, they can fill in additionaly fields including the `assignee`, `priority` `severity` and `status` of the bug report.
1. Log-in to any user type
2. Click `Create` in the top right
3. Fill in the required fields
    * Attempting to create a bug report without filling in all the **required** fields (`summary`, `description` and `component`) will result in an error being shown to the user and the bug report not being created until the user has fixed the erroring fields
    * If the user is an employee, the `assignee` field is also required
4. Click `Create`
5. A message should pop up indicating that the bug report was created successfully

#### Assigning Bug Reports
Assigning bug reports can be done by any employee but is recommended to be done by the manager, especially when the status of the bug is also being changed. For example, when moving from `Validated` to `In Progress`.

##### Assigning bug reports when creating or editing a bug report
You can assign a bug report to a user when creating or editing the bug report by entering a name in the assignee field.

##### Assigning bug reports using the `Re-Assign` button
You can assign a bug report to a user by clicking the `Re-Assign` button on the right hand menu when viewing a bug report's details. This will bring up a modal which allows you to enter a user's name.

#### Changing the Status
Changing the status can be done using the bug report editor, the change status button or any of the additional buttons that have been added for the user's convenience for commonly used statuses such as `In Progess` for developers.

#### Tester Descrepancies
Testers have a few additional buttons that allow them to change the status of a bug report to important statuses that are related to testing. These include setting the status to `Testing`, `Validated` and `QA Testing`. They can also close a bug using the `Not A Bug` button which automatically closes the bug and sets the resolution status to `Not a Bug`.

##### Developer Descrepancies
Developers have a few additional buttons that allow them to change the status of a bug report to import statuses that are related to development. These include setting the status to `In Progress`, `Code Complete`, `Code Review` and `Test Ready`.

#### Viewing Reported and Assigned Bug Reports
Employees have the ability to change which view they are on. By default, employees can see all reported bugs. However, they can further filter these bugs using the `Assigned` and `Reported` buttons available in the left of the window.

Clicking the `Assigned` button will only show the bug reports that have been assigned to the current user. Click `Reported` button will only show the bug reports that have been reported by the current user.

#### Sorting Bug Reports
Sorting bugs reports can be done by any user. By default tickets are sorted by `last modified` in descending order. Changing the sorting category sorts all the available tickets by that category
1. Log in to `Manager` (or any user)
2. Select `Status` in the sort by dropdown menu above the bug report list
3. The ticket list should sort itself by status name alphabetically

#### Searching Bug Reports
Searching bug reports can be done by any user. By default, all bug reports are displayed. Users can enter both a search string and select a category in order to search for bug reports within that category.
1. Log in to `Manager` (or any user)
2. Enter `SCU` in the search bar
3. Select `Summary` from the category dropdown menu on the search bar
4. Click `Search`
5. The ticket list should now only contain bug reports that contain the term `SCU` in the summary
6. Click the `x` icon on the left of the search bar to clear the search

The search bar can accept partial matches but does **NOT** do fuzzy searching. Furthermore, the search component does basic validation in that a user cannot search without selecting a category and vise versa.

#### User Management (manager only)
In additional to the functionality described in the above sections, `managers` can also assign users to any role (manager, tester, developer or user).
1. Log in as a `Manager`
2. Click the `Users` button on the top left
3. All users that have made accounts will be visible
4. Change change your user's role (the account that you made in the `Getting Started` section) to `Manager`
5. You should see a message pop up that indicates that changing the role was successful
