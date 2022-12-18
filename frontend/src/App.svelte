<script lang="ts">
  import type { ICreateUrrlResponse } from '../../shared/interfaces/createUrrlResponse';

  const backendUrlBase = 'http://localhost:3000/api';
  let linkValue: string = '';
  let currentHash: string;
  let currentError: string;


  const processLink = async() => {
    if (!linkValue || linkValue.length < 3) {
      currentError = 'You must provide a link first';
      return;
    }

    try {
      currentError = null;
      currentHash = null;
      const createLinkResponse = await fetch(`${backendUrlBase}/shorturl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: linkValue})
      });
      const responseJSON: ICreateUrrlResponse = await createLinkResponse.json();
      if (responseJSON.error) {
        currentError = responseJSON.error;
      } else {
        console.log(`Got response from server : ${responseJSON.urrl.shortUrl}`);
        currentHash = `${backendUrlBase}/shorturl/${responseJSON.urrl.shortUrl}`;
      }
    } catch (error) {
      currentError = error;
    }
  }

  const copyToClipboard = () => {
    if (currentHash && navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentHash);
    }
  };

  const clearError = () => {
    currentError = null;
  }
</script>

  <div class="main">
    <h1>Lunii Uniform Ressource Re-Locators</h1>
    <div class="step">
      <div class="step-header">
        <div class="step-number"><span>1</span></div>
      </div>
      <div class="step-content">
        <input class="input" type="text" on:keypress={clearError} bind:value={linkValue} placeholder="Enter your destination link here">
        {#if currentError}
          <span class="error">{currentError}</span>
        {/if}
      </div>
    </div>
    <div class="step">
      <div class="step-header">
        <div class="step-number"><span>2</span></div>
      </div>
      <div class="step-content">
        <button on:click={processLink}>Get Shrinked Link</button>
      </div>
    </div>
    {#if currentHash}
    <div class="step">
      <div class="step-header">
        <div class="step-number"><span>3</span></div>
      </div>
      <div class="step-content">
        <span class="link">{currentHash || 'No URRL'}</span>
        <button on:click={copyToClipboard}>Copy to clipboard</button>
      </div>
    </div>
    {/if}
  </div>

<style>
  h1{
    font-size: 2rem;
  }

  .main {
    display: flex;
    flex-direction: column;
    
  }

  .error {
    color: red;
    display: block;
    position: absolute;
    bottom: -1.3rem;
    right: 0;
  }

  .step {
    display: flex;
    justify-content: center;
    margin-bottom: 1.6rem;
    align-items: center;
    position: relative;
  }

  .step-header {
    width: 10rem;
  }
  .step-content {
    width: 35%;
    position: relative;
  }
  .step-number {
    display: flex;
    margin-right: 2rem;
    border-radius: 10rem;
    background-color: #097f82;
    color: #FBBD2A;
    font-weight: 2rem;
    width: 2rem;
    height: 2rem;
    justify-content: center;
    align-items: center;
  }
  .link {
    padding: 1rem;
  }
  .input {
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.6rem;
  }
</style>