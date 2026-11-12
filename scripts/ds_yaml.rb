# Safe YAML bridge using Ruby/Psych already available on the host. No gem install.
require 'json'
require 'yaml'
require 'date'

def duplicates(node, errors)
  if node.is_a?(Psych::Nodes::Mapping)
    keys = {}
    node.children.each_slice(2) do |key, value|
      if key.is_a?(Psych::Nodes::Scalar)
        errors << "duplicate key #{key.value.inspect} at YAML line #{key.start_line + 1}" if keys[key.value]
        keys[key.value] = true
      end
      duplicates(value, errors)
    end
  elsif node.respond_to?(:children) && node.children
    node.children.each { |child| duplicates(child, errors) }
  end
end

result = JSON.parse(STDIN.read).map do |item|
  begin
    errors = []
    duplicates(Psych.parse_stream(item.fetch('text')), errors)
    value = YAML.safe_load(item.fetch('text'), permitted_classes: [Date, Time], permitted_symbols: [], aliases: true)
    { 'path' => item.fetch('path'), 'value' => value, 'errors' => errors }
  rescue StandardError => e
    { 'path' => item.fetch('path'), 'value' => nil, 'errors' => [e.message] }
  end
end
STDOUT.write(JSON.generate(result))
