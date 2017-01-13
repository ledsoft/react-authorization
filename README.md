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

```
<IfAnyGranted expected={['ROLE_USER', 'ROLE_ADMIN']} actual={user.getRoles()} element='span'>
    <div className="panel">
        Child with restricted access.
    </div>
</IfAnyGranted>
```

Displays the child `div` if `user.getRoles()` contain `ROLE_USER` or `ROLE_ADMIN`. The children are wrapped in a `span` instead
of a `div`.

## API

Supported components:
* `IfAllGranted` - requires all of the expected roles to be granted,
* `IfAnyGranted` - requires at least one of the expected roles to be granted,
* `IfGranted` - shorthand for expecting one role only - corresponds to using `IfAnyGranted` with exactly one role expected.

API of the respective components is described below.

### `IfAllGranted`

Displays the children if and only if all of the expected roles are granted.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| expected | Array | `true`     |               | An array of roles required to display the children. |
| actual   | String/Array | `false` | []        | An array of actually granted roles, or a single role (shorthand for an array with one element). |
| element  | String | `false`   | div           | Element used to enclose the rendered children.      |
| unauthorized | Node | `false` | `null`          | Node to display when the actual roles do not meet the expectations. Defaults to `null`, which displays nothing. |


### `IfAnyGranted`

Displays the children if at least one of the expected roles is granted.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| expected | Array | `true`     |               | An array of roles required to display the children. |
| actual   | String/Array | `false` | []        | An array of actually granted roles, or a single role (shorthand for an array with one element). |
| element  | String | `false`   | div           | Element used to enclose the rendered children.      |
| unauthorized | Node | `false` | `null`          | Node to display when the actual roles do not meet the expectations. Defaults to `null`, which displays nothing. |


### `IfGranted`

Displays the children if the expected role is granted.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| expected | String | `true`     |               | The role required to display the children. |
| actual   | String/Array | `false` | []        | An array of actually granted roles, or a single role (shorthand for an array with one element). |
| element  | String | `false`   | div           | Element used to enclose the rendered children.      |
| unauthorized | Node | `false` | `null`          | Node to display when the actual roles do not meet the expectations. Defaults to `null`, which displays nothing. |


## Installation

Install with _npm_ using

```
npm install --save react-authorization
```

## License

MIT

