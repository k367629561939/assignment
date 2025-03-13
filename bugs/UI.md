1. Wrong username in Login causes page break
2. No success or failure indication to user when adding, updating, deleting employee
3. Narrow viewports (<1000) result in elements hidden behind one another
4. Long first or last names shift UI
5. Page is accessible without login, only data is not loaded
6. No error or user alert for wrong inputs in add and update employee modals

## Example Bug Report

### Summary
No error or user alert for wrong inputs in add and update employee modals

### Steps to Reproduce
1. Navigate to the benefits management page
2. Click on the "Add Employee" button to open the add employee modal
3. Enter invalid data in one or more fields (names over 50chars, string in dependants, etc.)
4. Click the "Add" button
5. No error message or alert is displayed

### Expected Results
An error message or alert should be displayed to inform the user of the incorrect input and guide them to correct it.

### Actual Results
No error message or alert is displayed, and the modal remains open with the invalid data.

### Screenshots
...

### Environment and version
...