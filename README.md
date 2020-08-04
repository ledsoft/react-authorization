# React Authorization Library

Declarative authorization API for the UI. Allows declarative description of what should and should not be displayed based on the
user's role in the system.

## Usage

```
<IfGranted expected='ROLE_ADMIN' actual={user.getRoles()}>
    <div className="panel">
        Child with restricted access.
    </div>
</IfGranted>
```

Displays the child `div` only if the `user.getRoles()` result contains the role `ROLE_ADMIN`.

```
<IfAllGranted expected={['ROLE_USER', 'ROLE_ADMIN']} actual={user.getRoles()} unauthorized={<h3>You shall not pass!</h3>}>
    <div className="panel">
        Child with restricted access.
    </div>
</IfAllGranted>
```

Displays the child `div` only if the `user.getRoles()` contains both `ROLE_USER` and `ROLE_ADMIN`. If not, a heading saying 
`You shall not pass!` is displayed. 

Specifying the node to display when expected roles are not met is optional (see the API section).

#### Rendering

##### Version 0.1.0

Since version 0.1.0, the library is using [React Fragments](https://reactjs.org/docs/fragments.html) to render the children, so no
additional wrapper element is added. Therefore, even multiple children:

```
<IfAnyGranted expected={['ROLE_USER', 'ROLE_ADMIN']} actual={user.getRoles()}>
    <div className="panel">
        Child with restricted access.
    </div>
    <div>
        And another one.
    </div>
</IfAnyGranted>
```

Will be rendered directly:

```HTML
<div class="panel">
    Child with restricted access.
</div>
<div>
    And another one.
</div>
```

##### Version 0.0.3 and Older

If there is at most one child passed to the authorization component, it is rendered directly. I.e., the result of the above declaration
will render the following HTML snippet:
```HTML
<div class="panel">
    Child with restricted access.
</div>
```
If multiple children are passed, they are wrapped in a structured element, by default a `div`. So the following declaration:
```
<IfAllGranted expected={['ROLE_USER', 'ROLE_ADMIN']} actual={user.getRoles()} unauthorized={<h3>You shall not pass!</h3>}>
    <div className="panel">
        Child One.
    </div>
    <div className="panel">
        Child Two.
    </div>
</IfAllGranted>
```
will be rendered as:
```HTML
<div>
    <div class="panel">
        Child One.
    </div>
    <div class="panel">
        Child Two.
    </div>
</div>
```

This default wrapper element can be overridden using the `element` prop: 
```
<IfAnyGranted expected={['ROLE_USER', 'ROLE_ADMIN']} actual={user.getRoles()} element='span'>
    <div className="panel">
        Child with restricted access.
    </div>
    <div>
        And another one.
    </div>
</IfAnyGranted>
```

The children above are wrapped in a `span` instead of a `div`:
```HTML
<span>
    <div class="panel">
        Child with restricted access.
    </div>
    <div>
        And another one.
    </div>
</span>
```

## API

Supported components:
* `IfAllGranted` - requires all of the expected roles to be granted,
* `IfAnyGranted` - requires at least one of the expected roles to be granted,
* `IfGranted` - shorthand for expecting one role only - corresponds to using `IfAnyGranted` with exactly one role expected,
* `IfNoneGranted` - requires that none of the expected roles is granted (e.g., role `guest` must not be set for editing access).

API of the respective components is described below.

### `IfAllGranted`

Displays the children if and only if all of the expected roles are granted.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| expected | Array | `true`     |               | An array of roles required to display the children. |
| actual   | String/Array | `false` | []        | An array of actually granted roles, or a single role (shorthand for an array with one element). |
| unauthorized | Node | `false` | `null`          | Node to display when the actual roles do not meet the expectations. Defaults to `null`, which displays nothing. |


### `IfAnyGranted`

Displays the children if at least one of the expected roles is granted.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| expected | Array | `true`     |               | An array of roles required to display the children. |
| actual   | String/Array | `false` | []        | An array of actually granted roles, or a single role (shorthand for an array with one element). |
| unauthorized | Node | `false` | `null`          | Node to display when the actual roles do not meet the expectations. Defaults to `null`, which displays nothing. |


### `IfGranted`

Displays the children if the expected role is granted.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| expected | String | `true`     |               | The role required to display the children. |
| actual   | String/Array | `false` | []        | An array of actually granted roles, or a single role (shorthand for an array with one element). |
| unauthorized | Node | `false` | `null`          | Node to display when the actual roles do not meet the expectations. Defaults to `null`, which displays nothing. |


### `IfNoneGranted`

Displays the children if none of the expected roles is granted. Useful, for example, to prevent display of editing components to guests or otherwise restricted users.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| expected | String/Array | `true`     |               | An array of roles (or a single role) which must not be present to display children. |
| actual   | String/Array | `false` | []        | An array of actually granted roles, or a single role (shorthand for an array with one element). |
| unauthorized | Node | `false` | `null`          | Node to display when the actual roles do not meet the expectations. Defaults to `null`, which displays nothing. |


## Installation

Install with _npm_ using

```
npm install --save react-authorization
```

## License

MIT

