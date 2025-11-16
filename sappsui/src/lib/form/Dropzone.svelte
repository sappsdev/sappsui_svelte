<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		name: string;
		class?: string;
	};

	let { name, class: className }: Props = $props();

	const uid = $props.id();

	const drop = async (
		e: DragEvent & {
			currentTarget: EventTarget & HTMLLabelElement;
		}
	) => {};
</script>

<div class={cn('dropzone', className)}>
	<label
		for={`${uid}-{name}`}
		class="dropzone-input"
		ondragover={(e) => e.preventDefault()}
		ondrop={drop}
	>
		<input id={`${uid}-{name}`} type="file" hidden />
	</label>
	<div class="dropzone-files"></div>
</div>
