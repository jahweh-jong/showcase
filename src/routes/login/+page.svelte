<script>
    import { enhance } from '$app/forms';
    import toast from 'svelte-french-toast';
    export let form;
    let loading = false;

    const submitLogin = () => {
        loading = true;
        return async ({ result, update }) => {
        switch (result.type) {
            case 'success':
                await update();
                break;
            case 'invalid':
                toast.error('Invalid credentials');
                await update();
                break;
            case 'error':
                toast.error(result.error.message);
                break;
                default:
                await update();
        }
        loading = false;
        };
    };
</script>
<div class="flex flex-col items-center h-full w-full">
    <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
        Login to your account
    </h2>
    <p class="text-center mt-1">
        or <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline">Register</a> if you don't have an account.
    </p>

    <form action="?/login" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4" use:enhance={submitLogin}>
       
        <div class="form-control w-full max-w-md">
            <label for="email" class="label font-medium pb-1">
                <span class="label-text">Email</span>
            </label>
            <input disabled={loading} type="email" name="email" class="input input-bordered w-full max-w-md" />
        </div>

        <div class="form-control w-full max-w-md">
            <label for="password" class="label font-medium pb-1">
                <span class="label-text">Password</span>
            </label>
            <input disabled={loading} type="password" name="password" class="input input-bordered w-full max-w-md" />
        </div>  
        <div class="w-full max-w-md">
            <a href="/reset-password" class="font-medium text-primary hover:cursor-pointer hover:underline">Forgot password?</a>
        </div>
        <div class="w-full max-w-md pt-2">
            <button disabled={loading} type="submit" class="btn btn-primary w-full">Login</button>
        </div>
        {#if form?.notVerified}
            <div role="alert" class="alert alert-error w-full max-w-md"> 
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>You must verify your email before you can login.</span>
          </div>
        {/if}
    </form>
</div>