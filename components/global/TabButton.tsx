import { Dispatch, SetStateAction } from "react";
type Active = {
  active: Boolean;
  formType: FormType;
};
type FormType = "LOGIN" | "REGISTER";
interface Props {
  setActiveForm: Dispatch<SetStateAction<Active>>;
  activeForm: Active;
  title: String;
  activeType: FormType;
}
function TabButton({ setActiveForm, activeForm, title, activeType }: Props) {
  return (
    <button
      onClick={() => setActiveForm((s) => ({ ...s, formType: activeType }))}
      className={`text-white hover:opacity-80 text-sm flex-1 w-full ${
        activeForm.formType === activeType
          ? " bg-emerald-700"
          : " bg-emerald-950"
      } py-1`}
    >
      {title}
    </button>
  );
}

export default TabButton;
