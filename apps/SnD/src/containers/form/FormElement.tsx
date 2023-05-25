import React, { FC } from "react";
import { CSVLink } from "react-csv";
import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import ElementTypes from "../../types/ElementTypes";
import ICol from "../../types/ICol";
import InputTypes from "../../types/InputTypes";
import {
  AsyncAutoComplete,
  Autocomplete,
  CheckboxElement,
  FileElement,
  IconPicker,
  CsvElement,
  InputElement,
  DatePicker,
  MultiSelect,
  SelectElement,
  TextAreaElement,
} from "./formElements";
import IconComponent from "./IconComponent";

/* eslint-disable jsx-a11y/control-has-associated-label,no-nested-ternary */
interface IFormElement extends ICol {
  register?: UseFormRegister<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  control?: Control<FieldValues>;
  error?: string;
  parentState?: any;
  parentDispatch?: any;
  childSetStateGetter?: (data: any) => void;
}

const FormElement: FC<IFormElement> = (props) => {
  const [t] = useTranslation();
  const {
    type,
    elementType,
    error,
    addOnLabel,
    addOnIcon,
    addOnLabel2,
    addOnIcon2,
    backAddOn,
    addOnAction,
    addOnAction2,
    register,
    getValues,
    setValue,
    control,
    parentDispatch,
    childSetStateGetter,
    label1,
    label2,
    isChecked1,
    isChecked2,
    handleOnCheckbox1Change,
    handleOnCheckbox2Change,
    addQuestionData,
  } = props;

  const renderCheckbox2AddOn = () => {
    return (
      <>
        <div style={{ border: "1px solid #ced4da", paddingTop: "3px" }}>
          <label style={{ paddingLeft: "3px" }}>{label2}</label>
          <input
            style={{
              display: "inline-block",
              width: "30px",
              height: "14px",
              marginTop: "5px",
              color: "red",
            }}
            id="checkbox2"
            type="checkbox"
            checked={isChecked2}
            onChange={handleOnCheckbox2Change}
          />
        </div>
        <button
          tabIndex={-1}
          className="input-group-text"
          onClick={addQuestionData} // added this function on Click
          onKeyDown={addQuestionData} // added this function
          role="button"
          type="button"
        >
          <IconComponent iconName="FaPlus" />
        </button>
      </>
    );
  };

  const renderCheckbox1AddOn = () => {
    return (
      <>
        <div style={{ border: "1px solid #ced4da", paddingTop: "3px" }}>
          <label style={{ paddingLeft: "3px" }}>{label1}</label>
          <input
            style={{
              display: "inline-block",
              width: "30px",
              height: "14px",
              marginTop: "5px",
            }}
            id="checkbox1"
            type="checkbox"
            checked={isChecked1}
            onChange={handleOnCheckbox1Change}
          />
        </div>
      </>
    );
  };

  const renderAddOnLabelAndCheckbox = () => {
    return (
      <>
        {renderCheckbox1AddOn()}
        {renderCheckbox2AddOn()}
      </>
    );
  };

  const addLabelCheckbox = () => {
    if (!label1 && !label2) return <></>;
    if (!backAddOn) return <></>;
    return renderAddOnLabelAndCheckbox();
  };

  const renderFirstAddOn = () => {
    return (
      <button
        tabIndex={-1}
        id={addOnIcon}
        className="input-group-text"
        onClick={addOnAction}
        onKeyDown={addOnAction}
        role="button"
        type="button"
      >
        {renderAddOnIcon()}
      </button>
    );
  };

  const renderAddOnIcon = () => {
    if (addOnIcon) {
      return <IconComponent iconName={addOnIcon} />;
    } else if (addOnLabel) {
      return <i>{t(addOnLabel || "")}</i>;
    } else {
      return <i />;
    }
  };

  const renderSecondAddOn = () => {
    return (
      <button
        tabIndex={-1}
        id={addOnIcon2}
        style={{ color: "#f44336" }}
        className="input-group-text"
        onClick={addOnAction2}
        onKeyDown={addOnAction2}
        role="button"
        type="button"
      >
        {renderAddOnLabel()}
      </button>
    );
  };

  const renderAddOnLabel = () => {
    if (addOnIcon) {
      return <IconComponent iconName={addOnIcon2} />;
    } else if (addOnLabel2) {
      return <i>{t(addOnLabel2 || "")}</i>;
    } else {
      return <i />;
    }
  };

  const renderAddOn = () => {
    if (!addOnIcon2) return renderFirstAddOn();
    return (
      <>
        {renderFirstAddOn()}
        {renderSecondAddOn()}
      </>
    );
  };

  const addOnAfter = () => {
    if (props.csvData) {
      return (
        <span className="input-group-text clickable" title="test.csv">
          <CSVLink data={props.csvData} filename={props.fileName}>
            <i className="fas fa-download" />
          </CSVLink>
        </span>
      );
    }
    if (!addOnLabel && !addOnIcon) return <></>;
    if (!backAddOn) return <></>;
    return renderAddOn();
  };
  const addOnBefore = () => {
    if (!addOnLabel && !addOnIcon) return <></>;
    if (backAddOn) return <></>;
    return renderAddOn();
  };
  const createElement = () => {
    switch (elementType) {
      case ElementTypes.DATE_PICKER:
        return (
          <DatePicker
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            control={control}
            error={error}
          />
        );
      // case ElementTypes.PHONE:
      //     return (
      //         <PhoneElement
      //             col={props}
      //             register={register}
      //             getValues={getValues}
      //             setValue={setValue}
      //             control={control}
      //             error={error}
      //         />
      //     );
      case ElementTypes.AUTO_COMPLETE_CLIENT_SIDE:
        return (
          <Autocomplete
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            control={control}
            error={error}
          />
        );
      case ElementTypes.AOTU_COMPLETE_SERVER_SIDE:
        return (
          <AsyncAutoComplete
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            control={control}
            error={error}
          />
        );
      case ElementTypes.SELECT:
        return (
          <SelectElement
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            control={control}
            error={error}
          />
        );
      case ElementTypes.CHECK_BOX:
        return (
          <CheckboxElement
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            checked={false}
            error={error}
          />
        );
      case ElementTypes.MULTI_SELECT_SEARCH:
        return (
          <MultiSelect
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            control={control}
            error={error}
          />
        );
      case ElementTypes.ICON_PICKER:
        return (
          <IconPicker
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            control={control}
            error={error}
          />
        );
      case ElementTypes.TEXT_AREA:
        return (
          <TextAreaElement
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            control={control}
            error={error}
          />
        );
      case ElementTypes.CSV:
        return (
          <CsvElement
            col={{ ...props, key: "bulk" }}
            register={register}
            setValue={setValue}
            getValues={getValues}
            error={error}
          />
        );
      default:
        if (type === InputTypes.FILE) {
          return (
            <FileElement
              col={props}
              register={register}
              getValues={getValues}
              setValue={setValue}
              error={error}
              parentState={props.parentState}
              parentDispatch={parentDispatch}
              childSetStateGetter={childSetStateGetter}
            />
          );
        }
        return (
          <InputElement
            col={props}
            register={register}
            getValues={getValues}
            setValue={setValue}
            error={error}
          />
        );
    }
  };

  const createElementWithAddOns = () => {
    return (
      <>
        {addOnBefore()}
        {createElement()}
        {addOnAfter()}
        {addLabelCheckbox()}
      </>
    );
  };

  return createElementWithAddOns();
};
export default FormElement;
