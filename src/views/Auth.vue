<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "radix-vue";
import {
  postSignUpData,
  postSignInData,
  validateSignUp,
  validateSignIn,
} from "./services/authService";
import { useUserStore } from "@/chat/store/user";
import { useToastStore } from "@/toast/toast";
import Toast from "@/toast/Toast.vue";

const toastStore = useToastStore();

const setToastStore = (status: boolean, title: string, message: string) => {
  toastStore.setStatus(status, title, message);

  setTimeout(() => {
    toastStore.setStatus(false, "", "");
  }, 10000);
};

const activeTab = ref<"tab1" | "tab2">("tab1");

const router = useRouter();
const userStore = useUserStore();

const emailSignUp = ref("");
const usernameSignUp = ref("");
const passwordSignUp = ref("");
// ------- //
const emailSignIn = ref("");
const passwordSignIn = ref("");

const errorsSignUp = ref({
  email: "",
  username: "",
  password: "",
});

const errorsSignIn = ref({
  email: "",
  password: "",
});

const signUpHandler = () => {
  const credentialsSignUp = {
    email: emailSignUp.value,
    username: usernameSignUp.value,
    password: passwordSignUp.value,
  };

  if (!validateSignUp(credentialsSignUp, errorsSignUp)) return;

  postSignUpData(credentialsSignUp);

  setToastStore(true, "Registrering", "Du skapade ett nytt konto");
  activeTab.value = "tab1";
};

const signInHandler = async () => {
  const credentialsSignIn = {
    email: emailSignIn.value,
    password: passwordSignIn.value,
  };

  if (!validateSignIn(credentialsSignIn, errorsSignIn)) return;

  try {
    const response = await postSignInData(credentialsSignIn);

    if (response.error) {
      errorsSignIn.value = response.error;
      return;
    }
    // Successful login
    const credentialsUser = {
      id: response.user.id,
      name: response.user.name,
      image: response.user.image,
    };
    userStore.setUser(credentialsUser);
    localStorage.setItem("token", response.token);
    router.push("/");

    setToastStore(true, "Inloggning", "Du loggade in, välkommen " + response.user.name + "!");
  } catch (err) {
    console.error("Inloggningen misslyckades: ", err);
  }
};
</script>

<template>
  <TabsRoot v-model="activeTab" class="tabsRoot">
    <TabsList class="tabsList" aria-label="Manage your account">
      <TabsIndicator class="tagsIndicator">
        <div style="width: 100%; height: 100%" class="tabsIndicator" />
      </TabsIndicator>
      <TabsTrigger class="tabsTrigger" value="tab1"> Logga in </TabsTrigger>
      <TabsTrigger class="tabsTrigger" value="tab2"> Skapa konto </TabsTrigger>
    </TabsList>
    <TabsContent class="tabsContent" value="tab1">
      <p class="tabsText">Logga in på ditt konto</p>
      <form @submit.prevent="signInHandler">
        <fieldset class="tabsFieldset">
          <label class="tabsLabel" for="name"> E-Mail </label>
          <input v-model="emailSignIn" id="loginEmail" class="tabsInput" />
          <p v-if="errorsSignIn.email" class="error">{{ errorsSignIn.email }}</p>
        </fieldset>
        <fieldset class="tabsFieldset">
          <label class="tabsLabel" for="username"> Lösenord </label>
          <input v-model="passwordSignIn" id="loginPassword" class="tabsInput" type="password" />
          <p v-if="errorsSignIn.password" class="error">{{ errorsSignIn.password }}</p>
        </fieldset>
        <div :style="{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }">
          <button class="tabsButton">Logga in</button>
        </div>
      </form>
    </TabsContent>
    <TabsContent class="TabsContent" value="tab2">
      <p class="tabsText">Skapa ett nytt konto</p>
      <form @submit.prevent="signUpHandler">
        <fieldset class="tabsFieldset">
          <label class="tabsLabel" for="registerEmail"> E-Mail </label>
          <input v-model="emailSignUp" id="registerEmail" class="tabsInput" type="email" />
          <p v-if="errorsSignUp.email" class="error">{{ errorsSignUp.email }}</p>
        </fieldset>
        <fieldset class="tabsFieldset">
          <label class="tabsLabel" for="registerUsername"> Användarnamn </label>
          <input v-model="usernameSignUp" id="registerUsername" class="tabsInput" type="name" />
          <p v-if="errorsSignUp.username" class="error">{{ errorsSignUp.username }}</p>
        </fieldset>
        <fieldset class="tabsFieldset">
          <label class="tabsLabel" for="registerPassword"> Lösenord </label>
          <input v-model="passwordSignUp" id="registerPassword" class="tabsInput" type="password" />
          <p v-if="errorsSignUp.password" class="error">{{ errorsSignUp.password }}</p>
        </fieldset>
        <div :style="{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }">
          <button type="submit" class="tabsButton">Skapa konto</button>
        </div>
      </form>
    </TabsContent>
  </TabsRoot>
  <Toast />
</template>

<style scoped>
.error {
  color: #e63946;
  font-size: 0.85rem;
  margin-top: 4px;
}

.tabsRoot {
  background-color: var(--color-background);
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  place-content: center;
}
.tagsIndicator {
  position: absolute;
  padding-left: 2rem;
  left: 0;
  height: 2px;
  bottom: 0;
  width: var(--radix-tabs-indicator-size);
  transform: translateX(var(--radix-tabs-indicator-position));
  border-radius: 9999px;
  transition-property: width, transform;
  transition-duration: 300ms;
}
.tabsTrigger {
  color: var(--color-heading);
  margin: auto;
  background-color: var(--color-background);
  border: none;
  border-radius: 2px;
  padding: 0.75rem;
  font-size: 1rem;
  font-family: "Dosis", sans-serif;
  font-weight: 400;
}
.tabsTrigger:first-child {
  border-top-left-radius: 6px;
}
.tabsTrigger:last-child {
  border-top-right-radius: 6px;
}
.tabsTrigger:hover {
  border-bottom: 2px solid var(--color-heading);
  cursor: pointer;
}
.tabsTrigger[data-state="active"] {
  border-bottom: 2px solid var(--color-heading);
}
.tabsContent {
  color: var(--color-heading);
  flex-grow: 1;
  padding: 20px;
  background-color: var(--color-background);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  outline: none;
}
.tabsText {
  color: var(--color-heading);
  margin-top: 1rem;
  margin-bottom: 20px;
  color: var(--color-heading);
  font-size: 1.5rem;
  line-height: 1.5;
  text-align: center;
  font-weight: 800;
}
.tabsFieldset {
  color: var(--color-heading);
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: none;
}
.tabsLabel {
  color: var(--color-heading);
  font-size: 1rem;
  line-height: 1;
  margin-bottom: 10px;
  color: var(--color-heading);
  display: block;
  font-weight: 800;
}
.tabsInput {
  color: black;
  flex: 1 0 auto;
  border-radius: 0.5rem;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  box-shadow: 0 0 0 1px var(--color-heading);
  height: 35px;
  outline: none;
  border: none;
}

.tabsInput:focus {
  box-shadow: 4px 4px 2px 2px var(--color-heading);
}

.tabsButton {
  color: var(--color-heading);
  background-color: var(--color-background-soft);
  border: none;
  padding: 0.75rem;
  border-radius: 2.5px;
  margin: 0.75rem auto auto auto;
  font-family: "Dosis", sans-serif;
  font-size: 1rem;
  border: 2px solid var(--color-background-soft);
}

.tabsButton:hover {
  cursor: pointer;
  background-color: var(--color-background);
}

.tabsList {
  flex-shrink: 0;
  display: flex;
  position: relative;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .tabsRoot {
    max-width: 40vw;
    background-color: var(--color-background-soft);
    margin: 10rem auto;
  }

  .tabsTrigger {
    font-size: 1.5rem;
    background-color: var(--color-background-soft);
  }

  .tabsInput,
  .tabsLabel {
    width: 60%;
    margin: 0.5rem auto;
  }

  .tabsButton {
    font-size: 1.5rem;
    background-color: var(--color-background-soft);
  }

  .tabsContent {
    background-color: var(--color-background-soft);
  }
}
</style>
