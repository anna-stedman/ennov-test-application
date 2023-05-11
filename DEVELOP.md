# Notes

My initial instinct is to use Python (Pandas) to manipulate any data in a csv - I haven't used typescript for this before. But I'll try with typescript.

I also haven't used docker before and it's taking too long to install and test that the files I have work... with more time I would figure this out.

## Notes after the 2 hour time limit

Steps and the order taken should be understandable from the git commits. 

I decided to concern myself with the project architecture and set up first. I initialised the repository with create-react-app as I thought it a generic enough web app that I have used before. I didn't have time to update the UI, although if I had continued for a few hours or days, I thought a UI would be nice (instead of printing out information to the console).

I then tried to add docker files - vscode provided a template and I followed instructions online. As stated above, I haven't used docker before and didn't have it installed on my personal laptop so was unable to verify that anything was working, and haven't been able to generate a docker image.

I next tried to set up the testing library and create an initial test for the only function that I had time to write. Running the function in the test does print out the Products from the csv file, but the function is not fully tested and more edge cases would have to be thoroughly tested and the code potentially tweaked to fix issues (e.g. invalid file paths, empty fields, unicode characters).


## Further work
I got Docker installed and got a basic image created using the updated Dockerfile.

Spent another 2-3hrs refining tests, improving the csv reader and implementing filters.
Further work would be required to fix the error handling on the csv parser, and finally some form of interacting with the logic via a front end or table.
Given the restriction of the assignment to using typescript, I have decided to focus on the solution set up and fundamental logic.

If there were no restriction to typescript, I may have gone about the problem in a slightly different way. 
I have used Python Pandas for ETL purposes previously and this can output tables for the end user to interact with.
If a nice user interface were the main aim, I would have used mui or bootstrap react tables, which have filtering built in to some extent. 