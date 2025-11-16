<script lang="ts">
	import { Card, Checkbox, Code, Section, Divider } from 'sappsui';

	let useProse = $state(false);

	let headingsCode = $derived(() => {
		if (useProse) {
			return `<div class="prose">
\t<h1>Heading 1</h1>
\t<h2>Heading 2</h2>
\t<h3>Heading 3</h3>
\t<h4>Heading 4</h4>
\t<h5>Heading 5</h5>
\t<h6>Heading 6</h6>
</div>`;
		}
		return `<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>`;
	});

	let textStylesCode = `<p class="lead">Lead text - larger paragraph text</p>
<p class="label">Label - small medium weight text</p>
<p class="tiny">Tiny - extra small text</p>
<a class="link">Link with hover effect</a>
<strong>Strong/Bold text</strong>`;

	let proseCode = `<div class="prose">
\t<h2>Article Title</h2>
\t<p>This is a paragraph with proper spacing and styling.</p>
\t
\t<h3>Subsection</h3>
\t<p>Another paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
\t
\t<ul>
\t\t<li>List item one</li>
\t\t<li>List item two</li>
\t\t<li>List item three</li>
\t</ul>
\t
\t<blockquote>
\t\tA thoughtful quote or citation.
\t</blockquote>
\t
\t<p>Text with <code>inline code</code> examples.</p>
\t
\t<a href="#">A styled link</a>
</div>`;
</script>

<Section>
	<div class="prose">
		<h1>Typography</h1>
		<p>
			Typography styles provide consistent text formatting across your application. Use standard
			HTML tags with or without the <code>prose</code> wrapper class.
		</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column gap-4">
			<div class="row items-center justify-between">
				<h4>Headings</h4>
				<Checkbox bind:checked={useProse} name="use-prose" label="Use .prose" />
			</div>
			<Divider />
			<div class="column gap-3" class:prose={useProse}>
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<h4>Heading 4</h4>
				<h5>Heading 5</h5>
				<h6>Heading 6</h6>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Code lang="html" code={headingsCode()} />
</Section>

<Section>
	<Card>
		<div class="column gap-4">
			<h4>Text Styles</h4>
			<Divider />
			<div class="column gap-3">
				<div>
					<p class="label mb-1">Lead</p>
					<p class="lead">This is lead text, used for introductory paragraphs or emphasis.</p>
				</div>
				<div>
					<p class="label mb-1">Label</p>
					<p class="label">This is label text, commonly used for form labels and UI text.</p>
				</div>
				<div>
					<p class="label mb-1">Tiny</p>
					<p class="tiny">This is tiny text, used for captions and small annotations.</p>
				</div>
				<div>
					<p class="label mb-1">Link</p>
					<a class="link" href="/#">This is a styled link with hover effect</a>
				</div>
				<div>
					<p class="label mb-1">Strong</p>
					<p><strong>This is strong/bold text</strong></p>
				</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Code lang="html" code={textStylesCode} />
</Section>

<Section>
	<Card>
		<div class="column gap-4">
			<h4>Prose Container</h4>
			<Divider />
			<div class="prose">
				<h2>Article Title with Border</h2>
				<p>
					The <code>prose</code> class provides comprehensive styling for long-form content. It automatically
					handles spacing, colors, and formatting for all common text elements.
				</p>

				<h3>Features</h3>
				<p>The prose container includes styles for:</p>

				<ul>
					<li>Headings with proper hierarchy and spacing</li>
					<li>Paragraphs with optimal line height and spacing</li>
					<li>Lists (ordered and unordered)</li>
					<li>Links with hover effects</li>
					<li>Code blocks and inline code</li>
					<li>Blockquotes and tables</li>
				</ul>

				<blockquote>
					This is a blockquote. It's styled with a left border and italic text to visually
					distinguish quoted content.
				</blockquote>

				<p>
					You can also use <code>inline code</code> within paragraphs, and create
					<a href="/#">styled links</a> that integrate seamlessly with your content.
				</p>

				<h4>Nested Lists</h4>
				<ol>
					<li>
						First ordered item
						<ul>
							<li>Nested unordered item</li>
							<li>Another nested item</li>
						</ul>
					</li>
					<li>Second ordered item</li>
					<li>Third ordered item</li>
				</ol>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Code lang="html" code={proseCode} />
</Section>

<Section>
	<div class="prose">
		<h3>Typography Classes</h3>
		<p>Available utility classes for text styling:</p>

		<h4>Headings</h4>
		<ul>
			<li><code>h1</code> - Extra large heading (text-4xl lg:text-5xl, font-extrabold)</li>
			<li><code>h2</code> - Large heading (text-3xl, font-semibold)</li>
			<li><code>h3</code> - Medium heading (text-2xl, font-semibold)</li>
			<li><code>h4</code> - Small heading (text-xl, font-semibold)</li>
			<li><code>h5</code> - Extra small heading (text-lg, font-semibold)</li>
			<li><code>h6</code> - Tiny heading (text-base, font-semibold)</li>
		</ul>

		<h4>Text Utilities</h4>
		<ul>
			<li><code>.lead</code> - Larger paragraph text (text-lg)</li>
			<li><code>.label</code> - Form labels and UI text (text-sm, font-medium)</li>
			<li><code>.tiny</code> - Extra small text (text-xs, font-medium)</li>
			<li><code>.link</code> - Styled links with hover effect</li>
			<li><code>strong</code> - Bold/semibold text</li>
			<li><code>blockquote</code> - Quoted text with border</li>
		</ul>

		<h4>Prose Container</h4>
		<ul>
			<li><code>.prose</code> - Comprehensive styling for long-form content</li>
			<li>Includes automatic spacing for all child elements</li>
			<li>Styled headings with border on h2</li>
			<li>Optimized paragraph spacing and line height</li>
			<li>Formatted lists, tables, code blocks, and blockquotes</li>
			<li>Link styling with color and hover effects</li>
			<li>Scroll margin for anchor links</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Usage Guidelines</h3>

		<h4>Without Prose</h4>
		<p>
			Use standalone heading tags and utility classes when you need more control over spacing and
			layout. This is ideal for:
		</p>
		<ul>
			<li>UI components and interfaces</li>
			<li>Cards and sections with custom layouts</li>
			<li>Mixed content with components</li>
		</ul>

		<h4>With Prose</h4>
		<p>
			Use the <code>prose</code> container for long-form content where you want consistent, automatic
			formatting. This is ideal for:
		</p>
		<ul>
			<li>Blog posts and articles</li>
			<li>Documentation pages</li>
			<li>Rich text content from CMS</li>
			<li>Markdown-generated HTML</li>
		</ul>
	</div>
</Section>
