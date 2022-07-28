import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
    title: "TodoLists/EditableSpan",
    component: EditableSpan,
    argTypes: {
        onChange: {description: "Button inside form clicked"},
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    onChange: action("Button inside form clicked"),
    title: "11"
};

