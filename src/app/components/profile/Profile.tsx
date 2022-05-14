import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, Select } from "antd";
import Input from "antd/lib/input/Input";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { StateType } from "../../core/redux/types";
import { UpdateProfile } from "../../../auth/core/redux/actions";

const Profile = (props) => {
  const userDetails = props.state.auth.user;

  console.log("---------> user details  ------>", userDetails);

  const { handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    setValue("first_name", userDetails?.first_name);
    setValue("last_name", userDetails?.last_name);
    setValue("email", userDetails?.email);
    setValue("gender", userDetails?.gender);
    setValue("image_url", userDetails?.image_url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const onSubmit = (data) => {
    console.log(data);

    data.user_id = props.state.auth.user.id;

    props.updateProfile(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "whitesmoke",
      }}
    >
      <Card title="Update your profile">
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "500px" }}>
          <Controller
            control={control}
            name="first_name"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                placeholder="First Name"
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                value={value}
                // inputRef={ref}
                style={{ margin: "10px", width: "100%" }}
              />
            )}
          />
          <Controller
            control={control}
            name="last_name"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                placeholder="Last Name"
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                value={value}
                // inputRef={ref}
                style={{ margin: "10px", width: "100%" }}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                disabled
                placeholder="Email"
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                value={value}
                // defaultValue={props.state.auth.user?.email}
                // inputRef={ref}
                style={{ margin: "10px", width: "100%" }}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Select
                placeholder="Gender"
                options={genderOptions}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                value={value}
                // inputRef={ref}
                style={{ margin: "10px", width: "100%" }}
              />
            )}
          />
          <Controller
            control={control}
            name="image_url"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Input
                placeholder="Profile Image URL"
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                value={value}
                // inputRef={ref}
                style={{ margin: "10px", width: "100%" }}
              />
            )}
          />

          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    updateProfile: (data: any) => dispatch(UpdateProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
