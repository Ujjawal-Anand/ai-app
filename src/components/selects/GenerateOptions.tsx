"use client";
import { capitalizeFirstChar } from "@/lib/string";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";

type GenerateOptionsProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
  label: string;
  required?: boolean;
  name?: string;
  shouldDisableUpdates?: boolean;
};

const GenerateOptions = (props: GenerateOptionsProps) => {
  return (
    <Select
      value={props.selectedOption}
      onValueChange={(value: string) =>
        props.setSelectedOption(value as string)
      }
      disabled={props.shouldDisableUpdates}
      required={props.required}
      name={props.name}
    >
      <SelectTrigger className="col-span-2" id="output-settings-js">
        <span className="font-semibold">
          {capitalizeFirstChar(props.selectedOption || props.label)}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.options.map((option) => (
            <SelectItem key={option} value={option}>
              <div className="flex items-center">
                <span className="font-semibold">
                  {capitalizeFirstChar(option)}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenerateOptions;
