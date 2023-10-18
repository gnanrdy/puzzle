1. Once search results are displayed after searching for an item, the same result re-appears after clearing and start typing some other search term.
Issue: Results are not cleared after removing the searched term from the input field.

2. Unnecessarily re-rendering the same list of books after clicking `want to read button`.
The same issue exists on removing books from the My Reading List.
Fix: Could avoid this issue by modifying the ngFor loop for displaying the search results and thereby re-rendering of same elements can be avoided.

3. Better to show the search results while typing itself rather than submitting from search button

Accessibility issues from Lighthouse:
1. Missing aria label in search button - Fixed
2. Color contrast issue - Fixed

Other Accessibility issues found:
1. No aria-label for want to read buttons in book list - Fixed
  (If book is not present in reading list, it will read as 'Want to read `book title`'? 
  If book is present in reading list, it will read as 'Book with title ... is already added!')
2. Missing aria-label in the close icon of the My Reading List - Fixed
3. No roles assigned to the book section - Fixed, but couldn't check it with a reader

Note: Along with the above changes, fixed some unit test case issues that were found while running the test.