<script lang="ts">
	import { useForm } from 'sappsui';
	import {
		TextField,
		Button,
		Checkbox,
		Toggle,
		Card,
		Code,
		Section,
		Divider,
		Select
	} from 'sappsui';

	const validationRuleOptions = [
		{ id: 'email', label: 'Email' },
		{ id: 'required', label: 'Required' },
		{ id: 'url', label: 'URL' },
		{ id: 'phone', label: 'Phone' },
		{ id: 'alphanumeric', label: 'Alphanumeric' },
		{ id: 'numeric', label: 'Numeric' },
		{ id: 'alpha', label: 'Alpha' },
		{ id: 'strongPassword', label: 'Strong Password' },
		{ id: 'creditCard', label: 'Credit Card' },
		{ id: 'date', label: 'Date' }
	];

	let showToast = $state(true);
	let autoReset = $state(true);
	let selectedValidation: any = $state('email');

	let form = useForm({
		validationRules: {
			email: [
				{ rule: 'required', message: 'Email is required' },
				{ rule: 'email', message: 'Invalid email format' }
			],
			name: [
				{ rule: 'required', message: 'Name is required' },
				{ rule: 'min:3', message: 'Name must be at least 3 characters' }
			],
			password: [
				{ rule: 'required', message: 'Password is required' },
				{ rule: 'min:8', message: 'Password must be at least 8 characters' }
			]
		},
		url: 'https://jsonplaceholder.typicode.com/users',
		showToast,
		onSuccess: (response) => {
			console.log('Form submitted successfully:', response);
		},
		onError: (errors) => {
			console.log('Form has errors:', errors);
		}
	});

	let basicCode = `<script lang="ts">
	import { useForm } from 'sappsui';
	import { TextField, Button } from 'sappsui';

	let form = useForm({
		validationRules: {
			email: [
				{ rule: 'required', message: 'Email is required' },
				{ rule: 'email', message: 'Invalid email format' }
			],
			name: [{ rule: 'required', message: 'Name is required' }]
		},
		url: 'https://api.example.com/users'
	});
<\/script>

<form bind:this={form.state} class="column gap-4">
	<TextField
		label="Name"
		name="name"
		error={form.errors.name}
	/>
	<TextField
		label="Email"
		name="email"
		error={form.errors.email}
	/>
	<Button type="submit" loading={form.isSubmitting}>
		Submit
	</Button>
</form>`;

	let advancedCode = `<script lang="ts">
	let form = useForm({
		validationRules: {
			email: [
				{ rule: 'required', message: 'Email is required' },
				{ rule: 'email', message: 'Invalid email format' }
			]
		},
		url: 'https://api.example.com/users',
		method: 'POST',
		idKey: 'id',
		headers: {
			'X-Custom-Header': 'value'
		},
		showToast: true,
		successTitle: 'User Created',
		successDescription: 'The user has been created successfully',
		errorTitle: 'Error',
		errorDescription: 'Failed to create user',
		transformData: (data) => ({
			...data,
			timestamp: new Date().toISOString()
		}),
		onSuccess: (response) => {
			console.log('Success:', response);
			// Redirect or update UI
		},
		onError: (errors) => {
			console.error('Errors:', errors);
		}
	});
<\/script>`;

	let validationRulesCode = `const validationRules = {
	// Required field
	name: [{ rule: 'required', message: 'Name is required' }],

	// Email validation
	email: [
		{ rule: 'required', message: 'Email is required' },
		{ rule: 'email', message: 'Invalid email format' }
	],

	// Min/Max length
	password: [
		{ rule: 'required', message: 'Password is required' },
		{ rule: 'min:8', message: 'Must be at least 8 characters' },
		{ rule: 'max:50', message: 'Must not exceed 50 characters' }
	],

	// URL validation
	website: [{ rule: 'url', message: 'Invalid URL format' }],

	// Phone validation
	phone: [{ rule: 'phone', message: 'Invalid phone number' }],

	// Pattern matching
	zipCode: [{ rule: 'pattern:^\\d{5}$', message: 'Must be 5 digits' }],

	// Type validations
	username: [{ rule: 'alphanumeric', message: 'Only letters and numbers' }],
	age: [{ rule: 'numeric', message: 'Must be a number' }],
	firstName: [{ rule: 'alpha', message: 'Only letters allowed' }],

	// Strong password
	securePassword: [
		{ rule: 'strongPassword', message: 'Must include uppercase, lowercase, number, and symbol' }
	],

	// Credit card
	cardNumber: [{ rule: 'creditCard', message: 'Invalid credit card number' }],

	// Date validation
	birthDate: [{ rule: 'date', message: 'Invalid date format' }],

	// Word count
	description: [
		{ rule: 'minWords:10', message: 'Must have at least 10 words' },
		{ rule: 'maxWords:100', message: 'Must not exceed 100 words' }
	],

	// Field matching
	confirmPassword: [
		{ rule: 'matches:password', message: 'Passwords do not match' }
	]
};`;
</script>

<Section>
	<div class="prose">
		<h1>useForm Hook</h1>
		<p>
			The useForm hook provides a powerful and flexible way to handle form validation, submission,
			and error handling with built-in support for various validation rules.
		</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Interactive Example</h4>
				<div class="column gap-4 flex-1 p-4">
					<form bind:this={form.state} class="column gap-4 max-w-md">
						<TextField
							label="Name"
							name="name"
							variant="primary"
							error={form.errors.name}
							info="Please enter your full name"
						/>
						<TextField
							label="Email"
							name="email"
							variant="primary"
							error={form.errors.email}
							info="Please enter your email"
						/>
						<TextField
							label="Password"
							name="password"
							type="password"
							variant="primary"
							error={form.errors.password}
							info="Minimum 8 characters"
						/>
						<Checkbox
							name="terms"
							label="I agree to the terms and conditions"
							defaultChecked={true}
						/>
						<Toggle name="notifications" label="Enable Notifications" defaultChecked={true} />
						<Button type="submit" loading={form.isSubmitting} label="Submit" />
					</form>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Configuration</h4>
				<div class="flex flex-col gap-2">
					<h6>Options</h6>
					<Checkbox bind:checked={showToast} name="show-toast" label="Show Toast Messages" />
				</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>Basic Usage</h3>
	</div>
	<Code lang="svelte" code={basicCode} />
</Section>

<Section>
	<div class="prose">
		<h3>Configuration</h3>
		<p>The useForm hook accepts a configuration object with the following properties:</p>
		<ul>
			<li>
				<code>validationRules</code> - Object defining validation rules for each field (required)
			</li>
			<li><code>url</code> - API endpoint URL for form submission (required)</li>
			<li>
				<code>method</code> - HTTP method: POST, PUT, PATCH, or DELETE (default: POST or PUT based on
				idKey)
			</li>
			<li>
				<code>idKey</code> - Field name used to determine if updating existing record (triggers PUT method)
			</li>
			<li><code>headers</code> - Additional HTTP headers to include in request</li>
			<li>
				<code>showToast</code> - Display toast notifications on success/error (default: false)
			</li>
			<li><code>successTitle</code> - Custom success toast title</li>
			<li><code>successDescription</code> - Custom success toast description</li>
			<li><code>errorTitle</code> - Custom error toast title</li>
			<li><code>errorDescription</code> - Custom error toast description</li>
			<li><code>transformData</code> - Function to transform form data before submission</li>
			<li><code>onSuccess</code> - Callback function called on successful submission</li>
			<li><code>onError</code> - Callback function called when validation or submission fails</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Return Values</h3>
		<p>The hook returns an object with the following properties:</p>
		<ul>
			<li><code>state</code> - Reference to the form element (use with bind:this)</li>
			<li><code>errors</code> - Object containing current validation errors</li>
			<li><code>isSubmitting</code> - Boolean indicating if form is currently submitting</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Available Validation Rules</h3>
		<p>The following validation rules are available:</p>
	</div>
	<Code lang="typescript" code={validationRulesCode} />
</Section>

<Section>
	<div class="prose">
		<h3>Advanced Usage</h3>
		<p>Example with all configuration options:</p>
	</div>
	<Code lang="svelte" code={advancedCode} />
</Section>

<Section>
	<div class="prose">
		<h3>Features</h3>
		<ul>
			<li>
				<strong>Automatic Validation</strong> - Validates on submit and clears errors on input
			</li>
			<li><strong>Multiple Validation Rules</strong> - Apply multiple rules to each field</li>
			<li><strong>Custom Error Messages</strong> - Define custom messages for each rule</li>
			<li><strong>Toast Notifications</strong> - Optional built-in toast notifications</li>
			<li><strong>Data Transformation</strong> - Transform data before submission</li>
			<li>
				<strong>Auto-detect Method</strong> - Automatically uses PUT for updates when idKey is present
			</li>
			<li>
				<strong>Token Authentication</strong> - Automatically includes Bearer token from localStorage
			</li>
			<li><strong>Form Reset</strong> - Automatically resets form after successful POST</li>
			<li><strong>Loading State</strong> - Track submission state with isSubmitting</li>
		</ul>

		<h3>Authentication</h3>
		<p>
			The hook automatically includes a Bearer token in the Authorization header if a token is found
			in localStorage under the key 'token'. This makes it easy to work with authenticated APIs.
		</p>

		<h3>Error Handling</h3>
		<p>
			Errors are automatically displayed on form fields when using components like TextField,
			Select, etc. Simply pass the error prop:
		</p>
		<Code lang="svelte" code={`<TextField name="email" error={form.errors.email} />`} />

		<h3>Update vs Create</h3>
		<p>
			When idKey is specified and the form data contains that key with a value, the hook
			automatically switches to PUT method and appends the ID to the URL:
		</p>
		<Code
			lang="typescript"
			code={`// Will POST to: /users
{ name: 'John', email: 'john@example.com' }

// Will PUT to: /users/123
{ id: 123, name: 'John', email: 'john@example.com' }`}
		/>
	</div>
</Section>
