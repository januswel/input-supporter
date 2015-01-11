# input-supporter
input supporters on AngularJS

demo
----

http://januswel.github.io/input-supporter/demo/


directives
----------

### remaining-letters

Counts up a number of remaining letters you can enter and stores it to
specified variable in current scope.

```html
<input type="text" ng-maxlength="16" remaining-letters="remainingLetters">
<span>you can add {{remainingLetters}} letters</span>
```

### password-strength

Calculates strength of password in the 0.0 to 1.0 range. This directive
evaluates next ways. In every angle, more is better.

1. password length
2. a number of character kinds

```html
<input type="password" password-strength="passwordStrength">
<span>password strength is {{passwordStrength}}</span>
```
