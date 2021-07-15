import React from "react";
import Layout from "../../components/layout/Layout";

const Confirm: React.FC = () => {
  return (
    <Layout>
      <div className="text-2xl font-bold text-gray-400 text-center">
        <div>登録されたアドレスに確認メールを送信しました！</div>
        <div className="mt-12">そちらから本登録を完了させてください！</div>
      </div>
    </Layout>
  );
};

export default Confirm;
