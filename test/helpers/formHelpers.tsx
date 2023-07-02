import {
  ByRoleMatcher,
  ByRoleOptions,
  Matcher,
  MatcherOptions,
} from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

type GetByTestId = (
  id: Matcher,
  options?: MatcherOptions | undefined
) => HTMLElement;

type GetByRole = (
  role: ByRoleMatcher,
  options?: ByRoleOptions | undefined
) => HTMLElement;

export function getFormElements(
  getByRole: GetByRole,
  getByTestId: GetByTestId
) {
  const nameInput = getByTestId("name");
  const phoneInput = getByTestId("phone");
  const addressInput = getByTestId("address");
  const submitButton = getByRole("button");

  return { nameInput, phoneInput, addressInput, submitButton };
}

export async function prefillFields(
  user: UserEvent,
  nameInput?: HTMLElement,
  phoneInput?: HTMLElement,
  addressInput?: HTMLElement
) {
  const EXAMPLE_NUMBER = "111111111111";
  const EXAMPLE_ADDRESS = "ddddddddddddd";
  const EXAMPLE_NAME = "Volodya";

  if (nameInput) {
    await user.type(nameInput, EXAMPLE_NAME);
  }
  if (phoneInput) {
    await user.type(phoneInput, EXAMPLE_NUMBER);
  }
  if (addressInput) {
    await user.type(addressInput, EXAMPLE_ADDRESS);
  }
}
