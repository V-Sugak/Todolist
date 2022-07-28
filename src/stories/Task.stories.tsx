import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "../Task";
import {AppRootType} from "../state/store";
import {useSelector} from "react-redux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {TaskType} from "../Todolist";

export default {
    title: "TodoLists/Task",
    component: Task,
    args: {},
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const Task1 = () => {
    const task = useSelector<AppRootType, TaskType>(state => state.tasks["todolistId1"][0])
    return <Task task={task} todolistId={"todolistId1"}/>
}

const Template: ComponentStory<typeof Task1> = (args) => <Task1/>

export const TaskStory = Template.bind({});
TaskStory.args = {};


