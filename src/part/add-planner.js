import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { nanoid } from "nanoid";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { IconClock } from "@tabler/icons-react";
import { TimeInput } from "@mantine/dates";
import { DatePickerInput } from "@mantine/dates";
import { Space } from "@mantine/core";

export default function AddStudyPlanner() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign,
      Placeholder.configure({ placeholder: "Write your topic here..." }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const submitForm = () => {
    let plans = JSON.parse(localStorage.getItem("plans"));

    if (!plans) plans = [];

    plans.push({
      id: Math.floor(Math.random() * 100000),
      title: title,
      content: content,
      date: date,
      startTime: startTime,
      endTime: endTime,
    });

    localStorage.setItem("plans", JSON.stringify(plans));

    navigate("/manage-planner");
  };

  return (
    <div
      className="container mt-5 mx-auto"
      style={{
        maxWidth: "800px",
      }}
    >
      <h1 className="pb-3">Add Study Planner</h1>
      <Card>
        <Card.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              submitForm();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>What's your topic for the day?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your topic..."
                id="plan-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What's your plan for today?</Form.Label>
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
              </RichTextEditor>
            </Form.Group>

            <div style={{ display: "flex" }}>
              <TimeInput
                label="Start time"
                icon={<IconClock size="1rem" stroke={1.5} />}
                maw={400}
                mx="end"
                id="start-time"
                value={startTime}
                onChange={(event) => {
                  setStartTime(event.target.value);
                }}
              />
              <Space w="xl" />
              <TimeInput
                label="End time"
                icon={<IconClock size="1rem" stroke={1.5} />}
                maw={400}
                mx="end"
                id="end-time"
                value={endTime}
                onChange={(event) => {
                  setEndTime(event.target.value);
                }}
              />
              <Space w="xl" />
              <DatePickerInput
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                label="Date input"
                placeholder="Date input"
                maw={400}
                mx="end"
              />
            </div>

            <div className="text-end mt-3">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3">
        <Link to="/manage-planner">
          <i className="bi bi-box-arrow-in-left me-2"></i>Back to Manage Planner
        </Link>
      </div>
    </div>
  );
}
