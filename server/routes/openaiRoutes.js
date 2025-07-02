//openai API 호출
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/test', async (req, res) => {
  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o', // 최신 모델 가능: gpt-4o, gpt-4-turbo, gpt-3.5-turbo 등
      messages: [
        { role: 'system', 
            content: `너는 문법, 표현, 문장 구조에 매우 민감한 국어 선생님이야.

                    다음 조건을 반드시 지켜줘:
                    1. 맞춤법, 띄어쓰기, 조사 오류는 국립국어원 기준에 맞춰 모두 수정한다.
                    2. 글의 종결어미는 유지한다.
                    3. 글의 맥락을 해치지는 않는 선에서 문장이 복잡하거나 장황하면 과감히 쪼개고 재구성한다.
                    4. 인용부호나 따옴표가 포함된 경우 생략하지 않고 그대로 유지한다.
                    5. 원문에 없는 줄바꿈이나 문장부호 및 기호를 따로 첨가하지 않는다.
                    6. 중복 표현, 비문, 부자연스러운 연결구는 정리한다.
                    7. **문장을 다듬더라도 의미가 조금이라도 달라지면 안 된다. 의미 보존이 최우선이다.**` },
        { role: 'user', 
            content: `앤슬리 부인이라고 생각한다. P.28의 “영원히 그럴거야, 내게는.”, 
            “그럼, 난 기억나” 라고 하는 부분과, P.44의 “난 그 추억을 소중히 간직하고 있어.” 부분을 보면 
            그녀는 델핀과 결혼을 하지 못했다고 하여 그것에 대한 안타까움, 아쉬움 등의 감정을 가지고 있는 것이 아니라, 
            그와 사랑할 수 있었던 그 시절에 대해 아름다운 추억으로 간직하고 있음을 알 수 있다. 
            반면 P.40 “왜냐하면 난 다만 그 일을 더 이상 참고 있을 수가 없어서 그래!” , 
            P.43 “이해하지? 난 알고 있었어…… 그래서 널 미워했어, 미워했단 말이야. 
            난 네가 델핀과 사랑에 빠진 것을 알았어……그리고 두려웠어, 네가 두려웠어” 에서 확인할 수 있듯 
            슬레이드 부인은 비록 델핀과의 결혼을 성공하긴 했지만, 친구가 자신이 사랑했던 남자를 사랑하고 있었다는 것에 대한 배신감, 
            질투심 등이 내면에 자리 잡고 있었고, 오랜 시간이 지난 현재에도 분노가 차오를 만큼 그 마음이 깊었음을 알 수 있다. 
            심지어 결말의 P.46 “그렇지만 난 기다리지 않았어. 그가 모든 것을 다 준비해두었거든.” 에서 델핀과 앤슬리의 사랑이 
            양방향이었음을 확인할 수 있었고, 이는 슬레이드 부인을 더 비참하게 만드는 진실이었다. 
            그리고 마지막 앤슬리 부인의 대사를 통해 그녀의 딸 바버라가 실은 델핀의 자식임을 암시하면서, 
            이를 종합해서 봤을 때 진정한 사랑을 쟁취한 사람은 앤슬리 부인 쪽이라는 생각이 들었다.`},
      ],
      max_tokens: 1000,
    });

    res.json({ result: chatResponse.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'OpenAI 호출 실패' });
  }
});

module.exports = router;