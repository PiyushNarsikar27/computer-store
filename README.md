# Solution to Zeller Coding Challenge

1. All the source code for the solution is inside the src directory. Below is a short description of each of the sub-directories of src:
* data - To store the hard coded values for catalogue and pricing rules
* implementations - Has the implentation of the ICheckout interface defined in types directory
* main - Has the driver code for sample cases from the examples given in the assignment. It logs the total price for both the cases to the console
* types - Types and interfaces

2. test dirctory has a single file containing the unit tests. To run the tests, run the command npm test after doing npm install

3. build-sample has the transpiled .js files. To run the pre-transpiled driver code, go to the /build-sample/main and run the command node sample-checkout.js