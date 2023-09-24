import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
  sleep,
} from "react-declarative";
import Image from "../../components/common/Image";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";

interface ITodoOnePageProps {
  id: string;
}
/*
const fields: TypedField[] = [
  {
    type: FieldType.Line,
    title: "System info",
  },
  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
    },
    fields: [
      {
        type: FieldType.Text,
        name: "userId",
        title: "User id",
        outlined: false,
        disabled: true,
      },
      {
        type: FieldType.Checkbox,
        fieldBottomMargin: "0",
        name: "completed",
        title: "Completed",
        disabled: true,
      },
    ],
  },
  {
    type: FieldType.Line,
    title: "Common info",
  },
  {
    type: FieldType.Text,
    name: "title",
    title: "Title",
  },
];
*/
const fields: TypedField[] = [
  {
    type: FieldType.Div,
    style: {
      boxSizing: "border-box",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "10px",
    },
    fields: [
      {
        type: FieldType.Div,
        style: {
          boxSizing: "border-box",
        },
        fields: [
          {
            type: FieldType.Component,
            element: (props) => <Image {...props} />,
          },
          {
            type: FieldType.Rating,
            name: "stars",
            defaultValue: 3,
          },
        ],
      },
      {
        type: FieldType.Div,
        style: {
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
        },
        fields: [
          {
            type: FieldType.Line,
            title: "Profile",
          },
          {
            type: FieldType.Combo,
            name: "gender",
            title: "Gender",
            description: "Your gender",
            async itemList() {
              await sleep(1e3);
              return [
                "male-unique-key",
                "female-unique-key",
                "other-unique-key",
              ];
            },
            async tr(current) {
              await sleep(5e2);
              if (current === "male-unique-key") {
                return "Male";
              } else if (current === "female-unique-key") {
                return "Female";
              } else if (current === "other-unique-key") {
                return "Other";
              } else {
                return "";
              }
            },
            defaultValue: "their-unique-key",
          },
          {
            type: FieldType.Combo,
            name: "statistics",
            title: "Statistics",
            description: "Your Statistics",
            async itemList() {
              await sleep(1e3);
              return [
                "male-unique-key",
                "female-unique-key",
                "other-unique-key",
              ];
            },
            async tr(current) {
              await sleep(5e2);
              if (current === "male-unique-key") {
                return "Male";
              } else if (current === "female-unique-key") {
                return "Female";
              } else if (current === "other-unique-key") {
                return "Other";
              } else {
                return "";
              }
            },
            defaultValue: "their-unique-key",
          },
          {
            type: FieldType.Div,
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
            },
            fields: [
              {
                type: FieldType.Text,
                name: "keyword",
                title: "Secret code",
                outlined: false,
                disabled: true,
              },
              {
                type: FieldType.Checkbox,
                fieldBottomMargin: "0",
                name: "completed",
                title: "Completed",
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    type: FieldType.Line,
    title: "All Info",
  },
  {
    type: FieldType.Text,
    name: "firstName",
    title: "Firstname",
  },
  {
    type: FieldType.Text,
    name: "lastName",
    title: "Lastname",
  },
  {
    type: FieldType.Text,
    name: "age",
    title: "Age",
  },
  {
    type: FieldType.Expansion,
    title: "Subscription",
    description: "Hide or disable",
    fields: [
      {
        type: FieldType.Switch,
        title: "Subscription",
        name: "subscribed",
        // defaultValue: true,
      },
    ],
  },
  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    },
    fields: [
      {
        type: FieldType.Div,
        fields: [
          {
            type: FieldType.Line,
            title: "Work",
          },
          {
            type: FieldType.Text,
            title: "Job Title",
            name: "jobTitle",
            // description:,
          },
          {
            type: FieldType.Text,
            title: "Job Area",
            name: "jobArea",
          },
        ],
      },
      {
        type: FieldType.Div,
        fields: [
          {
            type: FieldType.Line,
            title: "Home Address",
          },
          {
            type: FieldType.Text,
            name: "country",
            title: "Country",
          },
          {
            type: FieldType.Text,
            name: "city",
            title: "City",
          },
          {
            type: FieldType.Text,
            name: "state",
            title: "State",
          },
          {
            type: FieldType.Text,
            name: "address",
            title: "Address",
          },
        ],
      },
    ],
  },
];
export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [fetchApi<ITodoItem>(`/users/${id}`)] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Todo list"
          subtitle={props.todo.title}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
