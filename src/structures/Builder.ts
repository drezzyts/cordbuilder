import BuilderDefinition from "../statements/BuilderDefinition";
import { BuilderValidator, BuilderProperty, BuilderKeyword } from "../types/builder";

export default class Builder {
  public constructor(public def: BuilderDefinition, public type: string) {}

  public validate(props: BuilderValidator[]) : BuilderProperty[] {
    const builderProps = this.def.body.map(prop => prop.keyword.lexeme);

    props.forEach(({ prop, required, count }) => {
      if (!builderProps.includes(prop) && required) throw new Error(`Expected a ${this.type} ${prop}`);
      if (count == 0 && builderProps.includes(prop)) throw new Error(`Dont expects a ${prop} in this context`);
      if (builderProps.filter(bprop => bprop == prop).length > count && count != -1) throw new Error(`Expected ${count} ${this.type} ${prop}s`);
    })

    builderProps.forEach(prop => {
      if (!props.find(p => p.prop == prop)) throw new Error(`Invalid keyword in ${this.type} context has provided "${prop}"`);
    })

    return this.def.body.map(prop => { return { prop: prop.keyword.lexeme, value: prop.value.lexeme}; });
  }

  public has(prop: BuilderKeyword) {
    return this.def.body.some(x => x.keyword.lexeme === prop);
  }

  public safeGet(prop: BuilderKeyword) {
    return this.def.body.find(x => x.keyword.lexeme === prop)?.value.lexeme
  }

  public get(prop: BuilderKeyword) {
    const value = this.safeGet(prop);
    if (!value) throw new Error('Unexpected error ocurred!');

    return value;
  }
}