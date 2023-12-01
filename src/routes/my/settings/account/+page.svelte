<script>
    import { Input, Modal } from "$lib/components"
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    export let form
    export let data

    let loading;
    let emailModalOpen;
    let usernameModalOpen;

    $: emailModalOpen = false
    $: usernameModalOpen = false
    $: loading = false

	const submitUpdateEmail = () => {
		loading = true;
		emailModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					emailModalOpen = false;
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};

    const submitUpdateUsername = () => {
		loading = true;
		usernameModalOpen = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					usernameModalOpen = false;
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};

</script>


<div class="flex flex-col w-full h-full space-y-12">
    <div class="w-full">
        <h3 class="text-2xl font-medium">Change email</h3>
        <div class="divider" />
        <Modal label="change-email" checked={emailModalOpen}>
            <span slot="trigger" class="btn btn-primary">Change email</span>
            <h3 slot="heading">Change your email</h3>
            <form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
                <Input
                    label="Enter your new email address"
                    id="email"
                    type="email"
                    required={true}
                    value={form?.data?.email}
                    disabled={loading}
                />
                <button type="submit" class="btn btn-primary w-full" disabled={loading}>Change my email</button>
            </form>
        </Modal> 
    </div>

    <div class="w-full">
        <h3 class="text-2xl font-medium">Change username</h3>
        <div class="divider mb-0.5" />
        <Input
            label="Username"
            id="username" 
            required={true}
            value={data?.user?.username}
            disabled 
        />
        <Modal label="change-username" checked={usernameModalOpen}>
            <span slot="trigger" class="btn btn-primary">Change email</span>
            <h3 slot="heading">Change your username</h3>
            <form action="?/updateUsername" method="POST" class="space-y-2" use:enhance={submitUpdateUsername}>
                <Input
                    label="Enter your new username"
                    id="username" 
                    required={true}
                    value={form?.data?.username}
                />
                <button type="submit" class="btn btn-primary w-full" disabled={loading}>Change my username</button>
            </form> 
        </Modal> 
        {#if form?.message} 
            <p>{form.message}</p>
        {/if}
    </div>
</div>