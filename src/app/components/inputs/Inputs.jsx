import React from "react";
import { Input, Select, Switch, Form } from "antd";
const { Option } = Select;

export const CustomInput = ({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  maxLength,
  className,
  validateStatus,
  help,
  addonBefore,
  disabled,
  required,
  hasFeedback,
  type,
  testId,
  id,
  min,
  max,
  step,
  suffix,
  hidden,
}) => {
  return (
    <Form.Item
      hasFeedback={hasFeedback}
      label={label}
      className={className}
      labelCol={{ span: 24 }}
      validateStatus={validateStatus}
      help={help}
      required={required}
    >
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        addonBefore={addonBefore}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        data-testid={testId}
        id={id}
        min={min}
        max={max}
        step={step}
        suffix={suffix}
        hidden={hidden}
      />
    </Form.Item>
  );
};

export const SelectField = (defaultValue, values) => {
  return (
    <Select defaultValue={defaultValue} style={{ width: 120 }}>
      {values.map((value, index) => {
        return (
          <Option value={value} key={index}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};

export const SwitchField = () => {
  return <Switch defaultChecked style={{ maxWidth: 50 }} />;
};
