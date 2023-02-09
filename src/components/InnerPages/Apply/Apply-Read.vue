<template>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: gray">
        <router-link to="/">管制员中心</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: gray">
        <router-link to="/apply">管制员申请</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: dodgerblue">提交申请</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px'}">
      <a-steps :current="0">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>阅读</template>
          <template #description>
            <span>阅读管制员申请须知</span>
          </template>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>提交</template>
          <template #description>
            <span>提交管制申请表</span>
          </template>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>查阅</template>
          <template #description>
            <span>等待管理员查阅</span>
          </template>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>面试</template>
          <template #description>
            <span>与教员进行一场面试</span>
          </template>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template #title>完成</template>
          <template #description>
            <span>成为管制学员开始学习</span>
          </template>
        </a-step>

      </a-steps>
      <a-divider></a-divider>
      <a-row justify="space-between">
        <a-col span="2"></a-col>
        <a-col span="20">
          <a-typography>
            <a-typography-title>
              ATC学习申请条件
            </a-typography-title>
            <a-typography-paragraph>
              在申请管制员前，请仔细阅读下面内容，自审一下是否符合申请条件。
            </a-typography-paragraph>
            <a-typography-title>
              1. 飞行基本知识
            </a-typography-title>
            <a-typography-paragraph>
              首先，你必须具备一定的基本飞行知识。我们不推荐新手，或者连飞不太了解的学 习 ATC，因为你对飞行不熟悉在管制中会造成部分影响。我们将以飞行员中心的飞行时间作为评判标准。
            </a-typography-paragraph>
            <a-typography-text type="danger">申请管制学习时需在本平台具有 25 小时连飞时长</a-typography-text>
            <a-typography-title>
              2. 英文要求
            </a-typography-title>
            <a-typography-paragraph>
              SKYline 连飞平台作为国内新兴连飞平台，在英文要求这方面 T1 管制员在英文方 面并没有要求，T2 及以上需熟练掌握英文陆空对话。在 T1 的学习过程中也充分给予管制学员学习英文的时间
            </a-typography-paragraph>
            <a-typography-paragraph>
              我们的管制申请表有一项英语程度的自我评判，分成六个级别，他们对应的英语熟练程度如下：
            </a-typography-paragraph>
            <a-typography-text type="secondary">1.几乎不懂英文<br></a-typography-text>
            <a-typography-text>2.粗通英文，了解一些英文飞行单词，借助文字和翻译器，可以进行英文陆空对话勉强能听懂和进行陆空对话<br></a-typography-text>
            <a-typography-text type="warning">3.能听懂大多数场景下的陆空对话，能用语音进行流利的英语对话除了熟练运用陆空对话外，还能使用英文处理一些非常规情景的对话。<br></a-typography-text>
            <a-typography-text type="success">4.英文交流基本无任何障碍。<br></a-typography-text>
            <a-typography-paragraph>
              <br>
              请参照上面的解释判断自己的英文程度填入管制申请表。
            </a-typography-paragraph>
            <a-typography-title>
              3. 正确的态度
            </a-typography-title>
            <a-typography-paragraph>
              在成为 SKYline 的管制员前，你首先必须明确，你是为机组服务的角色。而一个和谐，互助，快乐的氛围是 SKYline 连飞平台成立的初心。模拟飞行你会遇到不同熟练程度，不同飞行经验的飞友，更有许多新入门的飞友。除了提供正常的管制服务之外，你时间精力许可的情况下，要为这些飞友提供尽可能多的帮助。你的目的是为机组完成飞行任务提供支持，因此我们要求所有的管制在上线的时候具有尊重，耐心和包容的心态。对一些实在无法执行管制指令的飞友，在不影响其他交通的情况下，要做出适当的让步。
            </a-typography-paragraph>
            <a-typography-paragraph>
              请先仔细自审是否对管制工作有个正确的态度。如果你喜欢“吊”“欺负机组”“权利”， 如果你喜这种感觉，喜欢把一些新飞骂的灰头土脸的那种 感觉，那么SKYline 连飞平台不适合你，有很多平台能实现你的“愿望”
            </a-typography-paragraph>
            <a-typography-title>
              4. 来自其他平台的资深管制员
            </a-typography-title>
            <a-typography-paragraph>
              我们非常欢迎来自其他平台的资深管制员，甚至是真实管制员加入我们的队伍，你们的到来是 SKYline 的荣幸。注意，某些平台的管制权限 SKYline 空管中心会不承认，需从头培训加入管制队伍
            </a-typography-paragraph>
            <a-typography-paragraph>
              如果你自我评估都能达到上述的要求，那么请在这里填写你的管制申请。请认真填写，尤其是飞行经验方面的内容，不详细或者不全面的申请表有可能被拒绝。
            </a-typography-paragraph>
            <a-typography-paragraph></a-typography-paragraph>
            <a-typography-paragraph></a-typography-paragraph>
            <a-typography-paragraph></a-typography-paragraph>
          </a-typography>
        </a-col>
        <a-col span="2"></a-col>
      </a-row>
      <br>
      <a-row justify="space-between">
        <a-col :span="4"></a-col>
        <a-col :span="4">
          <a-button type="primary"><router-link to="/apply/create">同意</router-link></a-button>
        </a-col>
        <a-col :span="4">
          <a-button><router-link to="/apply">拒绝</router-link></a-button>
        </a-col>
        <a-col :span="4"></a-col>
      </a-row>
    </div>

  </a-layout-content>
</template>

<script>
import checkLogin from "@/utils/CheckLogin";
import router from "@/utils/router";
import {Step, Steps} from "ant-design-vue"

export default {
  name: "Apply-Read",
  components: {
    Steps, Step
  },
  setup() {
    let loginData = checkLogin.check()
    let logon = false
    if (loginData !== undefined) {
      logon = true
    } else {
      localStorage.setItem('loginFirst', '0')
      router.push('/login')
    }
    return {}
  }
}
</script>

<style scoped>

</style>