<script>
	import { Button, Checkbox, TextField, useForm } from 'sappsui';

	let form = useForm({
		validationRules: {
			email: [
				{ rule: 'required', message: 'Ingrese el email' },
				{ rule: 'email', message: 'El usuario ingresado no es un emaill valido!' }
			]
		},
		url: 'https://jsonplaceholder.typicode.com/users',
		showToast: true,
		onSuccess: (response) => {
			console.log('Form submitted successfully:', response);
		},
		onError: (errors) => {
			console.log('Form has errors:', errors);
		}
	});
</script>

<form bind:this={form.state} class="column gap-4">
	<TextField
		name="email"
		label="Usuario"
		variant="primary"
		placeholder="usuario@mail.com"
		errorText={form.errors.email}
		floatLabel
	/>
	<TextField
		name="password"
		type="password"
		label="Contraseña"
		variant="primary"
		placeholder="*********"
		endIcon="fluent:eye-circle-24-filled"
		floatLabel
	/>
	<div class="row justify-between items-center">
		<Checkbox name="remember" label="Recuérdame" />
		<small class="text-sm">Olvide mi Contraseña!</small>
	</div>
	<Button type="submit" label="Ingresar" wide solid />
</form>
