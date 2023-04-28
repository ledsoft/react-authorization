# React Authorization Library

Declarative authorization API for the UI. Allows declarative description of what should and should not be displayed
based on the user's role(s), or an authorization function result.

## Usage

```jsx
<IfGranted expected='ROLE_ADMIN' actual={user.getRoles()}>
    <div className="panel">
        Child with restricted access.
    </div>
</IfGranted>
```

Displays the child `div` only if the `user.getRoles()` result contains the role `ROLE_ADMIN`.

```jsx
<IfAllGranted expected={['ROLE_USER', 'ROLE_ADMIN']} actual={user.getRoles()} unauthorized={<h3>You shall not pass!</h3>}>
    <div className="panel">
        Child with restricted access.
    </div>
</IfAllGranted>
```

Displays the child `div` only if the `user.getRoles()` contains both `ROLE_USER` and `ROLE_ADMIN`. If not, a heading
saying `You shall not pass!` is displayed. Specifying the node to display when expected roles are not met is optional (
see the API section).

```jsx
<IfAuthorized isAuthorized={() => user.getRoles().indexOf('ROLE_ADMIN') !== -1}>
    <div className="panel">
        Child with restricted access.
    </div>
</IfAuthorized>
```

Displays the child `div` only if the specified authorization function returns a truthy value.

```jsx
<IfAuthorized isAuthorized={hasAccess(AccessLevel.WRITE, AccessLevel.READ)}>
    <div className="panel">
        Child with restricted access.
    </div>
</IfAuthorized>
```

Displays the child `div` if the `hasAccess` function (first parameter being required access level, second the actual granted) returned true.
This is basically equivalent to doing
```jsx
{hasAccess(AccessLevel.WRITE, AccessLevel.READ) && <div className="panel">
  Child with restricted access.
</div>}
```
You be the judge of which is nicer.

#### Rendering

The library is using [React Fragments](https://reactjs.org/docs/fragments.html) to render the children directly without
any wrapper element. For example:

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

Versions prior to 0.1.0 used a wrapper element (a `div` by default, but could be overridden).

## API

Supported components:

* `IfAllGranted` - requires all of the expected roles to be granted,
* `IfAnyGranted` - requires at least one of the expected roles to be granted,
* `IfGranted` - shorthand for expecting one role only - corresponds to using `IfAnyGranted` with exactly one role
  expected,
* `IfNoneGranted` - requires that none of the expected roles is granted (e.g., role `guest` must not be set for editing
  access),
* `IfAuthorized` - invokes the specified authorization function and renders children only if it returns a truthy value (
  since **0.3.0**).

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

Displays the children if none of the expected roles is granted. Useful, for example, to prevent display of editing
components to guests or otherwise restricted users.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| expected | String/Array | `true`     |               | An array of roles (or a single role) which must not be present to display children. |
| actual   | String/Array | `false` | []        | An array of actually granted roles, or a single role (shorthand for an array with one element). |
| unauthorized | Node | `false` | `null`          | Node to display when the actual roles do not meet the expectations. Defaults to `null`, which displays nothing. |

### `IfAuthorized`

Displays the children if the provided authorization function returns a truthy value or if the provided boolean value is `true`. Useful for more complex
authorization logic which should still be declaratively used.

| Property | Type  | Required | Default value | Explanation |
| -------- | ----- | -------- | ------------- | ----------- |
| isAuthorized | Function/boolean | `false`   |      | An authorization function with signature `() => boolean` or a boolean. Defaults to `undefined`, which is equivalent to `false`. |
| unauthorized | Node | `false` | `null`      | Node to display when the authorization function returns a falsy value. Defaults to `null`, which displays nothing. |

## Installation

Install with _npm_ using

```
npm install --save react-authorization
```

## License

MIT

