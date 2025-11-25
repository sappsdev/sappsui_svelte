<script lang="ts">
	import { Card, Code, Section, Button, Divider } from 'sappsui';
	import promptContent from './sappsui-prompt.md?raw';

	const promptText = promptContent;

	const copyPrompt = () => {
		navigator.clipboard.writeText(promptText);
	};
</script>

<Section>
	<div class="prose">
		<h1>UI Component Generator - LLM Guide</h1>
		<p>
			Use this comprehensive guide to help AI assistants like Claude generate user interfaces with
			SappsUI components. This documentation covers the essential UI components for building pages
			and forms.
		</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column gap-4">
			<div class="row items-center justify-between">
				<h4>Component Reference Prompt</h4>
				<Button
					label="Copy Prompt"
					variant="outline"
					size="small"
					startIcon="fluent:copy-24-regular"
					onclick={copyPrompt}
				/>
			</div>
			<Divider />
			<div class="prose">
				<p>
					Copy and paste this complete reference into your LLM chat to enable accurate component
					generation with proper props:
				</p>
			</div>
			<Code lang="markdown" code={promptText} />
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>How to Use</h3>
		<p>Follow these steps to generate UI components with your AI assistant:</p>

		<ol>
			<li><strong>Copy the prompt</strong> - Click the "Copy Prompt" button above</li>
			<li>
				<strong>Start your conversation</strong> - Paste the prompt at the beginning of your chat
			</li>
			<li>
				<strong>Request UI components</strong> - Ask the AI to create pages, forms, or specific UI elements
			</li>
			<li><strong>Iterate</strong> - Refine the generated code with follow-up requests</li>
		</ol>

		<h4>Example Requests</h4>
		<p>Once you've provided the prompt, you can ask things like:</p>
		<ul>
			<li>"Create a login form with email and password fields"</li>
			<li>"Build a user profile page with avatar, text fields, and save button"</li>
			<li>"Generate a settings form with select dropdowns and action buttons"</li>
			<li>"Create a contact form with name, email, and message fields"</li>
			<li>"Build an action toolbar with icon buttons for add, edit, and delete"</li>
		</ul>
	</div>
</Section>

<Section>
	<Card variant="soft" color="primary">
		<div class="column gap-3">
			<h4>💡 Pro Tips</h4>
			<ul class="space-y-2">
				<li>
					<strong>Start minimal</strong> - Request components with only required props first
				</li>
				<li>
					<strong>Be specific about variants</strong> - Mention exact variant, size, and color when needed
				</li>
				<li>
					<strong>Use state binding</strong> - Always specify bind:value for TextField and Select
				</li>
				<li>
					<strong>Provide icon names</strong> - Use fluent icon format: fluent:icon-name-24-regular
				</li>
				<li>
					<strong>Request layout structure</strong> - Mention Section and Card for page organization
				</li>
				<li>
					<strong>Iterate incrementally</strong> - Add complexity step by step rather than all at once
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>Example Conversation</h3>
		<p>Here's how a typical conversation might look:</p>
	</div>

	<Card variant="outline">
		<div class="column gap-4">
			<div>
				<p class="label mb-2">You:</p>
				<p class="text-sm italic">[Paste the prompt above]</p>
			</div>
			<Divider />
			<div>
				<p class="label mb-2">You:</p>
				<p class="text-sm">
					"Create a user registration form with fields for name, email, password, and a role
					selector. Include submit and cancel buttons."
				</p>
			</div>
			<Divider />
			<div>
				<p class="label mb-2">AI:</p>
				<div class="text-sm">
					<Code
						lang="svelte"
						code={`<script lang="ts">
  import { Section, Card, TextField, Select, Button } from 'sappsui';

  let name = $state('');
  let email = $state('');
  let password = $state('');
  let role = $state('');

  const roleOptions = [
    { id: 'user', label: 'User' },
    { id: 'admin', label: 'Admin' },
    { id: 'moderator', label: 'Moderator' }
  ];

  const handleSubmit = () => {
    console.log({ name, email, password, role });
  };
<\/script>

<Section>
  <Card title="Register Account">
    <TextField
      label="Full Name"
      name="name"
      bind:value={name}
      placeholder="Enter your name"
    />

    <TextField
      label="Email"
      name="email"
      type="email"
      bind:value={email}
      placeholder="Enter your email"
    />

    <TextField
      label="Password"
      name="password"
      type="password"
      bind:value={password}
    />

    <Select
      label="Role"
      name="role"
      options={roleOptions}
      bind:value={role}
    />

    <div class="row gap-2">
      <Button onclick={handleSubmit}>
        Submit
      </Button>
      <Button variant="outline">
        Cancel
      </Button>
    </div>
  </Card>
</Section>`}
					/>
				</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>Available Components</h3>
		<p>The prompt includes these essential UI components:</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<Card variant="outline">
			<h5>Layout</h5>
			<ul class="text-sm space-y-1">
				<li><strong>Section</strong> - Page container</li>
				<li><strong>Card</strong> - Content container</li>
			</ul>
		</Card>

		<Card variant="outline">
			<h5>Forms</h5>
			<ul class="text-sm space-y-1">
				<li><strong>Button</strong> - Action buttons</li>
				<li><strong>IconButton</strong> - Icon-only buttons</li>
				<li><strong>TextField</strong> - Text input</li>
				<li><strong>Select</strong> - Dropdown selection</li>
			</ul>
		</Card>

		<Card variant="outline">
			<h5>Display</h5>
			<ul class="text-sm space-y-1">
				<li><strong>Avatar</strong> - User images</li>
				<li><strong>Icon</strong> - Display icons</li>
			</ul>
		</Card>

		<Card variant="outline">
			<h5>Features</h5>
			<ul class="text-sm space-y-1">
				<li>Required props clearly marked</li>
				<li>Default values documented</li>
				<li>All variants and sizes listed</li>
				<li>Usage patterns included</li>
			</ul>
		</Card>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Prompt Features</h3>
		<p>This comprehensive prompt includes:</p>
		<ul>
			<li><strong>Complete prop documentation</strong> - All available props with types</li>
			<li><strong>Required vs optional</strong> - Clear indication of what's required</li>
			<li><strong>Default values</strong> - Know what can be omitted</li>
			<li><strong>Multiple examples</strong> - Common usage patterns</li>
			<li><strong>Icon reference</strong> - Quick access to common fluent icons</li>
			<li><strong>Best practices</strong> - Guidelines for optimal usage</li>
			<li><strong>State management</strong> - How to use $state and bind:value</li>
		</ul>
	</div>
</Section>

<Section>
	<Card variant="soft" color="secondary">
		<div class="column gap-3">
			<h4>🚀 Best Practices</h4>
			<ul class="space-y-2">
				<li>
					<strong>Start with required props</strong> - Build basic components first, customize later
				</li>
				<li>
					<strong>Use proper state binding</strong> - Always use bind:value for form inputs
				</li>
				<li>
					<strong>Follow layout patterns</strong> - Wrap content in Section → Card structure
				</li>
				<li>
					<strong>Match variants to actions</strong> - Use danger for delete, outline for cancel
				</li>
				<li>
					<strong>Provide event handlers</strong> - Always include onclick for buttons
				</li>
				<li>
					<strong>Test incrementally</strong> - Verify each component works before adding more
				</li>
				<li>
					<strong>Use consistent icons</strong> - Stick with fluent icon set for uniformity
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>When to Update the Prompt</h3>
		<p>You may need to re-paste the prompt if:</p>
		<ul>
			<li>Starting a new conversation or chat session</li>
			<li>The AI forgets component syntax or uses incorrect props</li>
			<li>Switching between different types of UI (forms vs displays)</li>
			<li>The generated code doesn't match expected prop structure</li>
			<li>After long conversations when context may be lost</li>
		</ul>

		<h4>Component-Specific Documentation</h4>
		<p>
			For detailed information about individual components, their full prop lists, and advanced
			usage examples, refer to the dedicated documentation pages for each component.
		</p>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Common Patterns</h3>
	</div>

	<Card variant="outline">
		<div class="column gap-4">
			<div>
				<h5>Login Form Pattern</h5>
				<Code
					lang="svelte"
					code={`<Section>
  <Card title="Login">
    <TextField label="Email" name="email" type="email" bind:value={email} />
    <TextField label="Password" name="password" type="password" bind:value={password} />
    <Button onclick={handleLogin}>Login</Button>
  </Card>
</Section>`}
				/>
			</div>

			<Divider />

			<div>
				<h5>Profile Header Pattern</h5>
				<Code
					lang="svelte"
					code={`<div class="row items-center gap-4">
  <Avatar src="/user.jpg" size="lg" />
  <div class="column flex-1">
    <h3>{userName}</h3>
    <p class="text-sm">{userEmail}</p>
  </div>
  <IconButton icon="fluent:edit-24-regular" onclick={handleEdit} />
</div>`}
				/>
			</div>

			<Divider />

			<div>
				<h5>Action Toolbar Pattern</h5>
				<Code
					lang="svelte"
					code={`<div class="row gap-2">
  <IconButton icon="fluent:add-24-regular" onclick={handleAdd} />
  <IconButton icon="fluent:edit-24-regular" onclick={handleEdit} />
  <IconButton icon="fluent:delete-24-regular" variant="danger" onclick={handleDelete} />
</div>`}
				/>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<div class="prose">
		<h3>Limitations & Notes</h3>
		<ul>
			<li>
				<strong>Verify props</strong> - AI may occasionally suggest non-existent props, always check
				against the prompt
			</li>
			<li>
				<strong>State management</strong> - Remember to declare reactive state with $state()
			</li>
			<li>
				<strong>Event handlers</strong> - Must be defined in the script section before use
			</li>
			<li>
				<strong>Icon format</strong> - Only fluent icons in format: fluent:name-24-regular
			</li>
			<li>
				<strong>Options array</strong> - Select component requires array of objects with id and label
			</li>
			<li>
				<strong>Custom styling</strong> - Beyond listed props, use class prop for custom styles
			</li>
			<li>
				<strong>Complex layouts</strong> - May need manual adjustment of spacing and positioning
			</li>
		</ul>
	</div>
</Section>

<Section>
	<Card variant="soft" color="info">
		<div class="column gap-3">
			<h4>📚 Additional Resources</h4>
			<p class="text-sm">
				For more detailed component documentation, advanced usage, and complete prop references,
				visit the individual component pages in the documentation.
			</p>
			<div class="row gap-2 flex-wrap">
				<Button variant="outline" size="small" href="/docs/section">Section</Button>
				<Button variant="outline" size="small" href="/docs/card">Card</Button>
				<Button variant="outline" size="small" href="/docs/avatar">Avatar</Button>
				<Button variant="outline" size="small" href="/docs/button">Button</Button>
				<Button variant="outline" size="small" href="/docs/icon-button">IconButton</Button>
				<Button variant="outline" size="small" href="/docs/text-field">TextField</Button>
				<Button variant="outline" size="small" href="/docs/select">Select</Button>
				<Button variant="outline" size="small" href="/docs/icon">Icon</Button>
			</div>
		</div>
	</Card>
</Section>
