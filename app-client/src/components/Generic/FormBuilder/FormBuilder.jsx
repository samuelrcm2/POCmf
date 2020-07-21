import React, { Fragment } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import useStyles from "./FormBuilderStyle";

const FormBuilder = (props) => {
  const { formProps } = props;
  const { forms } = formProps;
  const classes = useStyles();

  const createSwitch = (switchForm) => {
    return (
      <div className={classes.switch}>
        <Tooltip
          title={switchForm.tooltipTitle}
          placeholder={switchForm.tooltipPlaceholder}
        >
          <FormControlLabel
            control={
              <Switch
                checked={switchForm.checked}
                onChange={() => switchForm.onChange(switchForm.checked)}
                name={switchForm.name}
                color="primary"
                size="small"
              />
            }
            label={switchForm.label}
          />
        </Tooltip>
      </div>
    );
  };

  const createTextFieldForm = (form) => {
    if (!form.isVisible) return null;
    if (form.hasTooltip)
      return (
        <Tooltip
          title={form.tooltip.message}
          placeholder={form.tooltip.placeholder}
        >
          <TextField
            className={clsx(classes.textField, classes.margin)}
            id={form.id}
            onChange={(ev) => form.onChange(ev.target.value)}
            label={form.label}
            type={form.inputType}
            defaultValue={form.defaultValue}
            InputProps={{
              className: classes.input,
            }}
          />
        </Tooltip>
      );
    return (
      <TextField
        className={clsx(classes.textField, classes.margin)}
        id={form.id}
        onChange={(ev) => form.onChange(ev.target.value)}
        label={form.label}
        type={form.inputType}
        defaultValue={form.defaultValue}
        InputProps={{
          className: classes.input,
        }}
      />
    );
  };

  const createSelectFieldForm = (form) => {
    if (!form.isVisible) return null;
    if (form.hasTooltip)
      return (
        <Tooltip
          title={form.tooltip.message}
          placeholder={form.tooltip.placeholder}
        >
          <FormControl className={classes.formControl} size="small">
            <InputLabel>{form.label}</InputLabel>
            <Select
              value={form.defaultValue}
              onChange={(ev) => form.onChange(ev.target.value)}
            >
              {form.selectOptions.map((options) => (
                <MenuItem key={options.id} value={options.id}>
                  {options.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Tooltip>
      );
    return (
      <FormControl className={classes.formControl} size="small">
        <InputLabel>{form.label}</InputLabel>
        <Select
          value={form.defaultValue}
          onChange={(ev) => form.onChange(ev.target.value)}
        >
          {form.selectOptions.map((options) => (
            <MenuItem key={options.id} value={options.id}>
              {options.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const createButtom = (buttom) => {
    return (
      <div className={classes.button}>
        <Tooltip
          title={buttom.tooltipMessage}
          placeholder={buttom.tooltipPlaceholder}
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              disabled={buttom.disabled}
              onClick={() => buttom.onClick()}
            >
              {buttom.label}
            </Button>
          </span>
        </Tooltip>
      </div>
    );
  };
  return (
    <Fragment>
      {formProps.hasSwitch && createSwitch(formProps.switch)}
      {forms.map((f) => {
        switch (f.type) {
          case "TextField":
            return createTextFieldForm(f);
          case "Select":
            return createSelectFieldForm(f);
          default:
            return null;
        }
      })}
      {formProps.hasButtom && createButtom(formProps.bottom)}
    </Fragment>
  );
};

FormBuilder.propTypes = {
  formProps: PropTypes.exact({
    forms: PropTypes.arrayOf(
      PropTypes.exact({
        type: PropTypes.oneOf(["TextField", "Select"]),
        id: PropTypes.string,
        label: PropTypes.string,
        inputType: PropTypes.string,
        defaultValue: PropTypes.node,
        onChange: PropTypes.func,
        hasTooltip: PropTypes.bool,
        tooltip: PropTypes.exact({
          message: PropTypes.string,
          placeholder: PropTypes.oneOf([
            "bottom-end",
            "bottom-start",
            "bottom",
            "left-end",
            "left-start",
            "left",
            "right-end",
            "right-start",
            "right",
            "top-end",
            "top-start",
            "top",
          ]),
        }),
        onlyAppearsWithSwitch: PropTypes.bool,
        isVisible: PropTypes.bool,
        selectOptions: PropTypes.arrayOf(PropTypes.object),
      })
    ).isRequired,
    hasSwitch: PropTypes.bool.isRequired,
    hasButtom: PropTypes.bool.isRequired,
    switch: PropTypes.exact({
      checked: PropTypes.bool,
      onChange: PropTypes.func,
      name: PropTypes.string,
      label: PropTypes.string,
      tooltipTitle: PropTypes.string,
      tooltipPlaceholder: PropTypes.oneOf([
        "bottom-end",
        "bottom-start",
        "bottom",
        "left-end",
        "left-start",
        "left",
        "right-end",
        "right-start",
        "right",
        "top-end",
        "top-start",
        "top",
      ]),
    }),
    bottom: PropTypes.exact({
      disabled: PropTypes.bool,
      label: PropTypes.string,
      onClick: PropTypes.func,
      tooltipMessage: PropTypes.string,
      tooltipPlaceholder: PropTypes.oneOf([
        "bottom-end",
        "bottom-start",
        "bottom",
        "left-end",
        "left-start",
        "left",
        "right-end",
        "right-start",
        "right",
        "top-end",
        "top-start",
        "top",
      ]),
    }),
  }),
};

export default FormBuilder;
