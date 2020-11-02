import { TextField, Button } from '@material-ui/core'
import * as React from 'react'
import { useFormik, FormikErrors } from 'formik'
import * as Yup from 'yup'

type Fields = {
  flag: string
}
export type Props = {
  disabled: boolean
  onSubmit: (
    fields: Fields,
    setErrors: (errors: FormikErrors<Fields>) => void
  ) => void
}

const validationSchema = Yup.object<Fields>().shape({
  flag: Yup.string().required('required'),
})

function AnswerForm(props: Props) {
  const formik = useFormik<Fields>({
    initialValues: { flag: '' },
    onSubmit: (values, { setErrors }) => {
      if (props.disabled) {
        alert('Need user sign in')
        return
      }

      props.onSubmit(values, setErrors)
    },
    validate: () => ({}),

    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: 'flex',
        maxWidth: '400px',
        flexDirection: 'column',
      }}
    >
      <TextField
        name="flag"
        label="FLAG_..."
        value={formik.values.flag}
        helperText={props.disabled && 'need login'}
        onChange={(e) => {
          formik.setFieldValue(
            'flag',
            e.target.value.trim().replace(/[^_0-9a-zA-Z]/g, '')
          )
        }}
        type="text"
        autoComplete="off"
        margin="normal"
        required
      />

      <Button
        type="submit"
        variant="outlined"
        color="primary"
        // disabled={props.disabled}
      >
        Submit
      </Button>
    </form>
  )
}

export default AnswerForm
