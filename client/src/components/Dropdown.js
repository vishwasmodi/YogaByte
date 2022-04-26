/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { poseImages } from "../utils/pose_images";

const Dropdown = ({ poseList, currentPose, setCurrentPose }) => {
  return (
    <Menu as="div" class="flex  flex-col absolute left-1/3 mt-5 z-50">
      <div>
        <Menu.Button class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 flex flex-row ">
          <img src={poseImages[currentPose]} class="w-10 h-10 mr-10" />
          <span class="text-2xl">{currentPose}</span>
          <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items class="mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {poseList.map((pose) => {
            return (
              <Menu.Item>
                {({ active }) => (
                  <div
                    class="flex flex-row mt-2 mb-1 justify-between mr-4 cursor-pointer border-b-2"
                    onClick={() => setCurrentPose(pose)}
                  >
                    <span class="text-xl ml-3">{pose}</span>
                    <img src={poseImages[pose]} class="w-10 h-10 " />
                  </div>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
