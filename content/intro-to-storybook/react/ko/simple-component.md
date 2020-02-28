---
title: 'Build a simple component'
tocTitle: 'Simple component'
description: 'Build a simple component in isolation'
commit: 403f19a
---

We’ll build our UI following a [Component-Driven Development](https://blog.hichroma.com/component-driven-development-ce1109d56c8e) (CDD) methodology. It’s a process that builds UIs from the “bottom up” starting with components and ending with screens. CDD helps you scale the amount of complexity you’re faced with as you build out the UI.

<!-- ko -->
저희는 앞으로 Component-Driven Development (CDD) 방법론에 따라 UI를 Build 할 것입니다. CDD는 "bottom up" 방식으로 Component에서 시작하여 화면에서 끝나는 UI Build 프로세스입니다. CDD 방법론은 UI를 구축할 때 전체적인 복잡도를 가늠할 수 있는 장점이 있습니다.
<!-- ko -->

## Task

![Task component in three states](/intro-to-storybook/task-states-learnstorybook.png)

`Task` is the core component in our app. Each task displays slightly differently depending on exactly what state it’s in. We display a checked (or unchecked) checkbox, some information about the task, and a “pin” button, allowing us to move tasks up and down the list. Putting this together, we’ll need these props:

<!-- ko -->
위에 보이는 Task는 우리 App의 핵심적인 역할을 하는 Component입니다. 각각의 Task는 자신의 상태에 따라 조금씩 다르게 생겼습니다. 우선 체크된 체크박스, task에 대한 정보, 그리고 task를 리스트의 위아래로 움직일 수 있는 'pin' 버튼이 제공되는데요, 이것들을 모두 합치려면 다음과 같은 props들을 필요로 합니다.
<!-- ko -->

- `title` – a string describing the task
- `state` - which list is the task currently in and is it checked off?

<!-- ko -->
- `title` – task를 설명하는 문자열
- `state` - 현재 리스트의 어느 작업이 진행중이고 완료되었는지에 대한 상태값
<!-- ko -->

As we start to build `Task`, we first write our test states that correspond to the different types of tasks sketched above. Then we use Storybook to build the component in isolation using mocked data. We’ll “visual test” the component’s appearance given each state as we go.

<!-- ko -->
`Task` 컴포넌트를 Build 하면서 우리는 우선 위에 보이는 각각의 다른 task의 타입을 나타내기 위한 상태값을 입력했습니다. 그리고 나서 컴포넌트를 mocked data를 사용하는 고립된 환경에서 Build 하기위해 Storybook을 사용했습니다.
<!-- ko -->

This process is similar to [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD) that we can call “[Visual TDD](https://blog.hichroma.com/visual-test-driven-development-aec1c98bed87)”.

<!-- ko -->
이 과정은 [Visual TDD](https://blog.hichroma.com/visual-test-driven-development-aec1c98bed87)” 라고 불리는 [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development)과 유사합니다
<!-- ko -->

## Get setup

First, let’s create the task component and its accompanying story file: `src/components/Task.js` and `src/components/Task.stories.js`.

<!-- ko -->
우선, task 컴포넌트와 부수적인 story file을 만들어 봅시다: `src/components/Task.js` and `src/components/Task.stories.js`.
<!-- ko -->

We’ll begin with a basic implementation of the `Task`, simply taking in the attributes we know we’ll need and the two actions you can take on a task (to move it between lists):

<!-- ko -->
`Task` 의 기본 즉, 우리가 앞으로 필요로할 속성을 부여하는 것과 수행할 두가지 액션 (목록간의 이동)을 구현하는 것부터 시작합니다. 
<!-- ko -->

```javascript
// src/components/Task.js

import React from 'react';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly={true} />
    </div>
  );
}
```

Above, we render straightforward markup for `Task` based on the existing HTML structure of the Todos app.

<!-- ko -->
위의 예시에서, 우리는 Todos 앱의 기존 HTML 구조를 베이스로 `Task`를 위한 마크업을 바로 렌더합니다.
<!-- ko -->

Below we build out Task’s three test states in the story file:

<!-- ko -->
그리고 아래와같이 Task의 세가지 상태값을 story file에 build 합니다
<!-- ko -->

```javascript
// src/components/Task.stories.js

import React from 'react';
import { action } from '@storybook/addon-actions';

import Task from './Task';

export default {
  component: Task,
  title: 'Task',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const taskData = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

export const Default = () => {
  return <Task task={{ ...taskData }} {...actionsData} />;
};

export const Pinned = () => <Task task={{ ...taskData, state: 'TASK_PINNED' }} {...actionsData} />;

export const Archived = () => (
  <Task task={{ ...taskData, state: 'TASK_ARCHIVED' }} {...actionsData} />
);
```

There are two basic levels of organization in Storybook: the component and its child stories. Think of each story as a permutation of a component. You can have as many stories per component as you need.

<!-- ko -->
스토리 북에는 기본적으로 컴포넌트와 하위 스토리 두개의 기본 레벨의 구성이 있습니다. 각 스토리를 컴포넌트의 순열이라고 생각하시면 쉽습니다. 스토리는 컴포넌트 당 필요한만큼 생성할 수 있습니다.
<!-- ko -->

- **Component**
  - Story
  - Story
  - Story

To tell Storybook about the component we are documenting, we create a `default` export that contains:

<!-- ko -->
Storybook에 우리가 작성중인 컴포넌트에 대해 알려주기 위해 우선 다음과 같은 내용을 포함하는 `default` export를 생성합니다.
<!-- ko -->

- `component` -- the component itself,
- `title` -- how to refer to the component in the sidebar of the Storybook app,
- `excludeStories` -- exports in the story file that should not be rendered as stories by Storybook.

<!-- ko -->
- `component` -- 해당 컴포넌트
- `title` -- Storybook app에서 컴포넌트를 refer 할 수 있는 ????
- `excludeStories` -- Storybook 렌더되어서는 안되는 것들을 Storybook의 story 형태로 story file 에 내보냅니다
<!-- ko -->

To define our stories, we export a function for each of our test states to generate a story. The story is a function that returns a rendered element (i.e. a component class with a set of props) in a given state---exactly like a React [Stateless Functional Component](https://reactjs.org/docs/components-and-props.html).

`action()` allows us to create a callback that appears in the **actions** panel of the Storybook UI when clicked. So when we build a pin button, we’ll be able to determine in the test UI if a button click is successful.

As we need to pass the same set of actions to all permutations of our component, it is convenient to bundle them up into a single `actionsData` variable and use React's `{...actionsData}` props expansion to pass them all at once. `<Task {...actionsData}>` is equivalent to `<Task onPinTask={actionsData.onPinTask} onArchiveTask={actionsData.onArchiveTask}>`.

Another nice thing about bundling the actions into `actionsData` is that you can `export` that variable and use the actions in stories for components that reuse this component, as we'll see later.

When creating a story we use a base task (`taskData`) to build out the shape of the task the component expects. This is typically modelled from what the true data looks like. Again, `export`-ing this shape will enable us to reuse it in later stories, as we'll see.

<div class="aside">
<a href="https://storybook.js.org/addons/introduction/#2-native-addons"><b>Actions</b></a> help you verify interactions when building UI components in isolation. Oftentimes you won't have access to the functions and state you have in context of the app. Use <code>action()</code> to stub them in.
</div>

## Config

We'll need to make a couple of changes to the Storybook configuration so it notices not only our recently created stories, but also allows us to use our CSS file.

Start by changing your Storybook configuration file (`.storybook/main.js`) to the following:

```javascript
// .storybook/main.js
module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
};
```

After completing the change above, inside the `.storybook` folder, add a new file called `preview.js` with the following:

```javascript
// .storybook/preview.js

import '../src/index.css';
```

Once we’ve done this, restarting the Storybook server should yield test cases for the three Task states:

<video autoPlay muted playsInline loop>
  <source
    src="/intro-to-storybook//inprogress-task-states.mp4"
    type="video/mp4"
  />
</video>

## Build out the states

Now we have Storybook setup, styles imported, and test cases built out, we can quickly start the work of implementing the HTML of the component to match the design.

The component is still basic at the moment. First write the code that achieves the design without going into too much detail:

```javascript
// src/components/Task.js

import React from 'react';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}
```

The additional markup from above combined with the CSS we imported earlier yields the following UI:

<video autoPlay muted playsInline loop>
  <source
    src="/intro-to-storybook/finished-task-states.mp4"
    type="video/mp4"
  />
</video>

## Specify data requirements

It’s best practice to use `propTypes` in React to specify the shape of data that a component expects. Not only is it self documenting, it also helps catch problems early.

```javascript
// src/components/Task.js

import React from 'react';
import PropTypes from 'prop-types';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  // ...
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  onArchiveTask: PropTypes.func,
  onPinTask: PropTypes.func,
};
```

Now a warning in development will appear if the Task component is misused.

<div class="aside">
An alternative way to achieve the same purpose is to use a JavaScript type system like TypeScript to create a type for the component properties.
</div>

## Component built!

We’ve now successfully built out a component without needing a server or running the entire frontend application. The next step is to build out the remaining Taskbox components one by one in a similar fashion.

As you can see, getting started building components in isolation is easy and fast. We can expect to produce a higher-quality UI with fewer bugs and more polish because it’s possible to dig in and test every possible state.

## Automated Testing

Storybook gave us a great way to visually test our application during construction. The ‘stories’ will help ensure we don’t break our Task visually as we continue to develop the app. However, it is a completely manual process at this stage, and someone has to go to the effort of clicking through each test state and ensuring it renders well and without errors or warnings. Can’t we do that automatically?

### Snapshot testing

Snapshot testing refers to the practice of recording the “known good” output of a component for a given input and then flagging the component whenever the output changes in future. This complements Storybook, because it’s a quick way to view the new version of a component and check out the changes.

<div class="aside">
Make sure your components render data that doesn't change, so that your snapshot tests won't fail each time. Watch out for things like dates or randomly generated values.
</div>

With the [Storyshots addon](https://github.com/storybooks/storybook/tree/master/addons/storyshots) a snapshot test is created for each of the stories. Use it by adding a development dependency on the package:

```bash
yarn add --dev @storybook/addon-storyshots react-test-renderer
```

Then create an `src/storybook.test.js` file with the following in it:

```javascript
// src/storybook.test.js

import initStoryshots from '@storybook/addon-storyshots';
initStoryshots();
```

That's it, we can run `yarn test` and see the following output:

![Task test runner](/intro-to-storybook/task-testrunner.png)

We now have a snapshot test for each of our `Task` stories. If we change the implementation of `Task`, we’ll be prompted to verify the changes.
