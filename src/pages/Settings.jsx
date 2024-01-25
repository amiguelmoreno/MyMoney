import DarkModeButton from "../features/settings/DarkModeButton";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Settings</Heading>
      </Row>
      <Row>{/* <DarkModeButton></DarkModeButton> */}</Row>
    </>
  );
}

export default Settings;
