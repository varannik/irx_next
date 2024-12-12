import useSelectedCalendar from "@/stores/useSelectedCalendarStore";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Tabs, Tab} from "@nextui-org/react";

export default function SelectCalendar() {
    const { currentCalendar, setCurrentCalendar } = useSelectedCalendar()
  return (
    <Dropdown backdrop="blur" >
      <DropdownTrigger>
        <Button variant="bordered">Calendar</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="faded" onAction={(key: React.Key) => setCurrentCalendar(String(key))}>
        <DropdownItem key="J">Persian</DropdownItem>
        <DropdownItem key="G">Gregorian</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}