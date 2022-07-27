import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {Task} from "../Task";
import {store} from "../state/store";
import {Provider} from "react-redux";

export default {
    title: "TodoLists/Task",
    component: Task,
    args: {
        todolistId: "ghhkjkjl",
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    return <Provider store={store}>
        <Task {...args} />
    </Provider>
};

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {id: "111", title: "JS", isDone: true},
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {id: "1112", title: "HTML", isDone: false},
};

