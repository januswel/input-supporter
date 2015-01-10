# input-supporter
input supporters on AngularJS

directives
----------

### remaining-letters

Counts up a number of remaining letters you can enter and stores it to
specified variable in current scope.

```html
<input type="text" ng-maxlength="16" remaining-letters="remainingLetters">
<span>you can add {{remainingLetters}} letters</span>
```
