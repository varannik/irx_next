import useSelectedCalendar from "@/stores/useSelectedCalendarStore";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Tabs, Tab} from "@nextui-org/react";
import CalendarIcon from "../icons/Calendar";

export default function SelectCalendar() {
    const { currentCalendar, setCurrentCalendar } = useSelectedCalendar()
  return (
    <Dropdown  >
      <DropdownTrigger>
      
        <Button className="min-w-8 ml-3" size="sm" variant="light">
         
          <CalendarIcon />
          {/* {currentCalendar == "J" ? "Pr" : "Gr" } */}
          </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="faded" onAction={(key: React.Key) => setCurrentCalendar(String(key))}>
        <DropdownItem key="J">Persian</DropdownItem>
        <DropdownItem key="G">Gregorian</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}