import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        getInputProps,
        saveButtonProps,
        setFieldValue,
        refineCore: { formLoading },
    } = useForm({
        initialValues: { name: "" },
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps} title="Criar Produto">
            <TextInput mt="sm" label="Nome" {...getInputProps("name")} />
        </Create>
    );
};


export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ProductCreate;