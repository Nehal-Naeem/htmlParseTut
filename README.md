# knowyourmeme

This is a little tool for parsing knowyourmeme pages. This is intended for educational use only and not to be run using automation.

## Next tasks
You can extend "knowyourmeme" in the following ways
* Add "title" to IMeme and create a new findTitle method in MemeViewer updating the tests accordingly. This will be a bit trickier than the findImage and findYear methods, try to avoid hard-coding array accesses (ie: you shouldn't have many \[0]s or \[1]s in your code).
* Update the downloadHTML method code to use the builtin "http" library instead of "fetch"
* Pull out a generic helper method to avoid duplication between findYear and findImage.
