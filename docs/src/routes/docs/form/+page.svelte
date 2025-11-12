<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import {
		Button,
		Card,
		Checkbox,
		Code,
		TextField,
		DateField,
		PasswordField,
		PhoneField,
		PinField,
		Section,
		Select,
		Slider,
		Toggle,
		RadioGroup,
		useForm
	} from 'sappsui';

	let form = useForm({
		validationRules: {
			email: [
				{ rule: 'required', message: 'Email is required' },
				{ rule: 'email', message: 'Invalid email format' }
			],
			name: [{ rule: 'required', message: 'Name is required' }],
			password: [{ rule: 'required', message: 'Password is required' }]
		},

		url: `${PUBLIC_BASE_URL}/users`
	});
	const selectOptions = [
		{ id: 1, label: 'Apple', value: 'option1' },
		{ id: 2, label: 'Banana', value: 'option2' },
		{ id: 3, label: 'Cherry', value: 'option3' },
		{ id: 4, label: 'Date', value: 'option4' },
		{ id: 5, label: 'Elderberry', value: 'option5' },
		{ id: 6, label: 'Fig', value: 'option6' },
		{ id: 7, label: 'Grape', value: 'option7' },
		{ id: 8, label: 'Honeydew', value: 'option8' },
		{ id: 9, label: 'Indian Fig', value: 'option9' },
		{ id: 10, label: 'Jackfruit', value: 'option10' }
	];
	let selectedOption = $state(selectOptions[9].id);

	const radioItems = [
		{ value: 'solid', label: 'Soldid' },
		{ value: 'soft', label: 'Soft' },
		{ value: 'outline', label: 'Outline' }
	];
</script>

<Section contentClass="gap-4 p-4">
	<Card contentClass="row center">
		<form bind:this={form.state} class="column gap-4 w-md">
			<TextField
				label="Name"
				name="name"
				variant="outline"
				error={form.errors.name}
				info="Please enter your full name"
			/>
			<TextField
				label="Email"
				name="email"
				error={form.errors.email}
				info="Please enter your email"
			/>
			<TextField
				label="Password"
				name="password"
				variant="underlined"
				error={form.errors.password}
				info="Please enter your password"
			/>
			<Select
				label="Email"
				name="account"
				bind:value={selectedOption}
				placeholder="Select your email"
				options={selectOptions}
				idKey="id"
				labelKey="label"
			/>
			<PhoneField
				label="Phone Number"
				name="phone"
				error={form.errors.phone}
				info="Please enter your phone number"
			/>
			<DateField
				label="Date of Birth"
				name="dob"
				error={form.errors.dob}
				info="Please select your date of birth"
			/>
			<PinField name="pin" type="number" label="Pin number" />
			<PasswordField
				label="Password Input"
				name="passwordInput"
				error={form.errors.passwordInput}
				info="Please enter a strong password"
			/>
			<Slider label="Volume" min={0} max={100} step={1} size="medium" color="primary" />
			<Checkbox name="terms" label="I agree to the terms and conditions" defaultChecked={true} />
			<Toggle name="enable" label="Enable Notifications" defaultChecked={true} />
			<Button type="submit">Click me</Button>
		</form>
	</Card>
</Section>
<Section contentClass="gap-4 p-4">
	<Card contentClass="column center gap-4">
		{#snippet header()}
			<h4>Radios</h4>
		{/snippet}
		<RadioGroup options={radioItems} name="radios" label="Radios" />
		<Code code="console.log('ok')" />
	</Card>
</Section>
