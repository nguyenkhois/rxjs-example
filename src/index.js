import * as Rx from "rxjs";

// Using for viewing results
let results = "";

// STEP 0 - Your input data
const myArray = [
    { id: 1, name: "Jannet Johansson" },
    { id: 2, name: "Magret Andersson" },
    { id: 3, name: "Peter Martinsson" }
];

// STEP 1 - Create your observable object
const observable = Rx.Observable.create(observer => {
    observer.next(myArray);
    observer.next(2);
    observer.next(3);
    observer.complete();
    observer.next(4); // Is not delivered because it is after .complete() and it would violate the contract
});

// STEP 2 - Create your subscription
const subscription = observable.subscribe(
    val => {
        // Your main processes are here
        typeof val === "object"
            ? val.map(item => (results += item.name + "<br>"))
            : (results += val + "<br>");

        /* same    
        if (typeof val === "object") {
            val.map(item => (results += item.name + "<br>"));
        } else {
            results += val + "<br>";
        }
        */

        console.log(val); // For testing purpose
    },
    err => console.log(err), // catch error(s)
    () => console.log("done") // another processes are here which you want when subscription done
);

// STEP 3 - Unsubscrible mannually for your app performance
setTimeout(() => {
    subscription.unsubscribe();
}, 5000);

// STEP 4 - Output your data
document.getElementById("app").innerHTML = `
<h1>Hello RxJS!</h1>
<div>${results}</div>
<div>
  Look
  <a href="http://reactivex.io/rxjs/manual/index.html" target="_blank">here</a>
  for more info about RxJS.
</div>
`;
